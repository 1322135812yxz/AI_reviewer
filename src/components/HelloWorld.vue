<template>
  <div class="flex items-center flex-col text-center p-12 h-screen">
    <div class="relative h-full mb-4">
      <video
        ref="localVideo"
        class="w-96 h-full bg-gray-200 mv-4 object-cover"
      ></video>
      <video
        ref="remoteVideo"
        class="w-32 h-48 absolute bottom-0 right-0 object-cover"
      ></video>
    <div v-if="caller && calling" class="absolute top-2/3 left-2/3 left-36 flex flex-col items-center">
      <p calss="mb-4 text-white">等待对方接听...</p>
      <img @click="hangUp" src="/src/assets/refuse.svg" class="w-16 cursor-pointer" alt="">
    </div>
    <div v-if="called && calling" class="absolute top-2/3 left-2/3 left-32 flex flex-col items-center">
      <p class="mb-4 text-white">收到视频邀请...</p>
      <div class="flex">
        <img @click="hangUp" src="/src/assets/refuse.svg" class="w-16 cursor-pointer mr-4" alt="">
        <img @click="acceptCall" src="/src/assets/accept.svg" class="w-16 cursor-pointer" alt="">
      </div>
    </div>
  </div>
  <div class="flex gap-2 mb-4">
    <button 
      class="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white"
      @click="callRemote">发起视频</button>
    <button
      class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white"
      @click="hangUp">挂断视频</button>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import {io,Socket} from 'socket.io-client'

const roomId='001' //暂时先写死一个房间ID

const called = ref<boolean>(false) //是否是接收方
const caller= ref<boolean>(false) //是否是发起方
const calling= ref<boolean>(false) //呼叫中
const communicating= ref<boolean>(false) //通话中
const localVideo= ref<HTMLVideoElement>() //video标签，播放本人视频
const remoteVideo= ref<HTMLVideoElement>() //video标签，播放对方视频
const socket=ref<Socket>()
const peer=ref<any>()
const localStream=ref<any>()

onMounted(()=>{
  //页面打开就会执行
  const sock=io('http://localhost:3000')

  sock.on('connectionSuccess',()=>{
    console.log('连接成功');
    //向服务器发送一个加入房间事件
    sock.emit('joinRoom',roomId)
  })

  sock.on('callRemote',()=>{
    if(!caller.value){  //不是发起方
      called.value=true //接收方
      calling.value=true //呼叫中
    } 
  })

  sock.on('acceptCall',async ()=>{
    if(caller.value){  //判断是不是接收方
      //用户A收到用户B的接受视频请求
      peer.value= new RTCPeerConnection()
      //添加本地音频流，生成offer
      peer.value.addStream(localStream.value)

      //通过监听onicecandidate事件获取到Candidate
      peer.value.onicecandidate=(event)=>{
        //console.log('用户A的candidate信息',event.candidate);
        if(event.candidate){
          //发送Candidate
          socket.value?.emit('sendCandidate',{candidate:event.candidate,roomId})
        }
      }

      //监听onaddStream来获取对方的音视频流
      peer.value.onicecandidate=(event)=>{
        console.log('用户A收到用户B的stream',event.stream);
        communicating.value=true;
        calling.value=false;
        remoteVideo.value!.srcObject=event.stream
        remoteVideo.value!.play();
      }

      //生成offer
      const offer=await peer.value.createOffer({
        offerToReceiveAudio:true,
        offerToReceiveVideo:true
      })

      console.log(offer);

      //设置本地offer
      await peer.value.setLocalDescription(offer)
      //发送offer
      socket.value?.emit('sendOffer',{offer,roomId})
    }
  })

  //收到offer
  sock.on('sendOffer',async (offer)=>{
    if(called.value){  //接收端 -用户B
      console.log('收到offer',offer);
      //创建自己的RTC
      peer.value= new RTCPeerConnection()
      //添加本地音源
      const stream=await getLocalStream()
      peer.value.addStream(stream)

      //通过监听onicecandidate事件获取candidate信息
      peer.value.onicecandidate=(event)=>{
        if(event.candidate){
          //向服务器发送candidate信息
          socket.value?.emit('sendCandidate',{roomId,candidate:event.candidate})
        }
      }


      //监听onaddStream来获取对方的音视频流
      peer.value.onicecandidate=(event)=>{
        console.log('用户B收到用户A的stream',event.stream);
        communicating.value=true;
        calling.value=false;
        remoteVideo.value!.srcObject=event.stream
        remoteVideo.value!.play();
      }

      //设置远端描述信息SDP
      await peer.value.setRemoteDescription(offer)
      //生成answer
      const answer=await peer.value.createAnswer()
      console.log('用户B生成answer',answer);
      //设置本地answer
      await peer.value.setLocalDescription(answer)
      //发送answer
      socket.value?.emit('sendAnswer',{answer,roomId})
    }
  })

  //用户A收到用户B的answer
  sock.on('sendAnswer',async (answer)=>{
    if(caller.value){
      console.log('用户A收到',answer);
      await peer.value.setRemoteDescription(answer)
    }
})

//收到Candidate信息
sock.on('sendCandidate',async (candidate)=>{
  if(caller.value){
    console.log('收到Candidate',candidate);
    await peer.value.addIceCandidate(candidate)
  }
})

socket.value=sock
})

//获取本地视频流
const getLocalStream=async()=>{
  const stream=await navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
  })

  if (localVideo.value) {
    localVideo.value.srcObject = stream
    localVideo.value.play()
  }

  localStream.value=stream

  return stream
}

//发起方发起视频请求
const callRemote= async ()=>{
  console.log('发起视频');
  //用户A向用户B发起视频请求
  caller.value=true //表示当前用户是发起方
  calling.value=true //表示正在呼叫中
  await getLocalStream()

  //向服务器发送一个视频请求事件
  socket.value?.emit('callRemote',roomId)
}

//接收方同意视频请求
const acceptCall=()=>{
  console.log('接受视频');
  //通过信令服务器通知用户A
  socket.value?.emit('acceptCall',roomId)
}

//挂断视频
const hangUp=()=>{
  console.log('挂断视频');
}

</script>
