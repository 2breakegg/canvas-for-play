//===============配置部分
video_change_config={
  close: 0,               // 1关闭效果 0不关闭
  use: 1,                 // 1使用配置 0不使用配置
  font_size:10,           // 字符的大小 必须为数字
  font_family:"微软雅黑", // 字体
  draw_type:2,            //效果的类型 必须为数字["blackWhite","drawChar","inverseColor","red","green","blue","mosaic"],
  fps:24,                 //每秒刷新次数
  chars:"．＇＿＿＿；；；～～～＊＊＝！＾＾＾／／／（（］］７二二１１１１３３２十十十三三了９９００＄士士小千８飞飞大大几计％＆＆从从手方车车生生开价乐乐乐涉涉涉考及＠这这些些发机快快间地的的浪角阿师我四就就弹度速联联德顿看看费费算算算榴榴圖",
  // chars:["．","一","十","大","三","天","王","日","四","田","同","国","圖"],
  // chars:["．","一","二","三","四","岁","国","圖"],
  // chars:["．","圖"],
}

//==============程序部分 别瞎改,小心电脑卡死
try{
  video_change.destroy();
}catch(e){}

var video_change={
  config_default:{
      font_size:5,
      font_family:"微软雅黑",
      chars:"．＇＿＿＿；；；～～～＊＊＝！＾＾＾／／／（（］］７二二１１１１３３２十十十三三了９９００＄士士小千８飞飞大大几计％＆＆从从手方车车生生开价乐乐乐涉涉涉考及＠这这些些发机快快间地的的浪角阿师我四就就弹度速联联德顿看看费费算算算榴榴圖",
      draw_type:0,
      fps:24,
  },
  font_size:5,
  font_family:"微软雅黑",
  chars:"．＇＿＿＿；；；～～～＊＊＝！＾＾＾／／／（（］］７二二１１１１３３２十十十三三了９９００＄士士小千８飞飞大大几计％＆＆从从手方车车生生开价乐乐乐涉涉涉考及＠这这些些发机快快间地的的浪角阿师我四就就弹度速联联德顿看看费费算算算榴榴圖",
  draw_type:0,
  fps:24,

  draw_types:["noEffect","blackWhite","drawChar","inverseColor","red","green","blue","mosaic"],

  isappend:false,
  video:null,
  video_box:null,
  canvas:null,
  canvas_box:null,
  ctx:null,

  video_height:0,
  video_width:0,          //视频的分辨率 同时也是canvas标签的width height
  video_element_height:0,
  video_element_width:0,  //video标签的style宽高  

  interval:0,//setInterval返回值 暂停用

  
  init:function(){
      if(video_change_config.close) return;
      if(!this.isappend){
          this.video=document.getElementsByTagName("video")[0];
          this.video_box=this.video.parentElement;
          this.canvas=document.createElement("canvas");
          this.canvas_box=document.createElement("div");

          this.ctx=this.canvas.getContext("2d");
      }
      if(video_change_config.use==1){
          this.readConfig(video_change_config);
      }else{
          this.readConfig(this.config_default);
      }

      this.resize();
      this.draw();
      if(!this.video.paused){
        this.drawStart();
      }
      this.addEvent();
  },
  readConfig:function(config){
      this.font_family=config.font_family;
      this.font_size= (config.font_size|0 > 0) ? config.font_size|0 : 1 ;
      this.chars=config.chars;
      this.draw_type= (config.draw_type|0) % this.draw_types.length;
      this.fps=config.fps>0? config.fps :1;
  },
  resize:function(){
      if(this.isappend){
          this.canvas.remove();
          this.canvas_box.remove();
      }
      this.canvas_box.append(this.canvas);
      this.video_box.append(this.canvas_box);
      
      var video=this.video;
      var canvas=this.canvas;
      var canvas_box=this.canvas_box;
      this.video_width=video.videoWidth;
      this.video_height=video.videoHeight;
      this.video_element_width=video.clientWidth;
      this.video_element_height=video.clientHeight;
      
      var video_width=this.video_width;
      var video_height=this.video_height;
      var video_element_width=this.video_element_width;
      var video_element_height=this.video_element_height;

      canvas.width=this.video_width;
      canvas.height=this.video_height;
      canvas.style.width="100%";
      canvas.style.height="100%";
      canvas.style.objectFit="contain";

      canvas_box.style.position="absolute";
      // canvas_box.style.width=this.video_element_width+"px";
      // canvas_box.style.height=this.video_element_height+"px";
      canvas_box.style.width="100%";
      canvas_box.style.height="100%";

      canvas_box.style.top=0+"px";
      canvas_box.style.left=0;
      canvas_box.style.zIndex=10;
  },
  resize2:function(){
      if(this.isappend){
          this.canvas.remove();
          this.canvas_box.remove();
      }
      this.canvas_box.append(this.canvas);
      document.body.append(this.canvas_box);

      var video=this.video;
      var canvas=this.canvas;
      var canvas_box=this.canvas_box;
      this.video_width=video.videoWidth;
      this.video_height=video.videoHeight;
      this.video_element_width=video.clientWidth;
      this.video_element_height=video.clientHeight;
      
      var video_width=this.video_width;
      var video_height=this.video_height;
      var video_element_width=this.video_element_width;
      var video_element_height=this.video_element_height;

      // this.canvas.style="position: absolute;top: 0;left: 0;"
      canvas.width=this.video_width;
      canvas.height=this.video_height;
      canvas.style.width="100%";
      canvas.style.height="100%";
      canvas.style.objectFit="contain";
      // canvas.style.top=video.scrollHeight-this.video_height+"px";
      
      canvas_box.style.position="absolute";
      canvas_box.style.width=this.video_element_width+"px";
      canvas_box.style.height=this.video_element_height+"px";
      canvas_box.style.top=0+"px";
      canvas_box.style.left=0;
      canvas_box.style.zIndex=99999;
      
  },
  draw:function(){
      var ctx=this.ctx;
      ctx.drawImage(this.video,0,0,this.video_width,this.video_height);
      var imageData=ctx.getImageData(0,0,this.video_width,this.video_height);        
      this[this.draw_types[this.draw_type]](imageData);
  },
  
  noEffect:function(imageData){},
  blackWhite:function(imageData){
      var data=imageData.data;
      var black;
      for(var i=0;i<data.length;i+=4){
          black=((data[i]+data[i+1]+data[i+2])/3)|0;
          data[i]=black;
          data[i+1]=black;
          data[i+2]=black;
      }
      this.ctx.putImageData(imageData,0,0);
  },
  drawChar:function(imageData){
      var ctx=this.ctx;
      // var canvas=this.canvas;
      var size=this.font_size;
      var data=imageData.data;
      var chars=this.chars;

      ctx.font=size+"px "+this.font_family;
      ctx.textAlign="start";      
      ctx.textBaseline="hanging";
      
      var w=Math.floor(this.video_width/size);
      var h=Math.floor(this.video_height/size);
      
      var top,left,top2,left2,pxId,pxId2,graw_level,char_line,char;
      for(top=0;top<h;top++){
          char_line="";
          for(left=0;left<w;left++){
              graw_level=0;
              pxId=this.video_width*size*top+left*size;
              //获取块黑白值
              for(top2=0;top2<size;top2++){
                  for(left2=0;left2<size;left2++){
                      pxId2=pxId+top2*this.video_width+left2;
                      graw_level+=data[pxId2*4];
                      graw_level+=data[pxId2*4+1];
                      graw_level+=data[pxId2*4+2];
                  }
              }
              graw_level=Math.floor((graw_level/size/size/3)/256*chars.length);
              charId=chars.length-1-graw_level
              char=chars[charId];
              if(char==undefined){
                  console.log(graw_level,charId);
              }
              char_line+=char;
              //console.log(Math.floor(graw_level/this.char.length));
          }
          ctx.fillStyle="#ffffff";
          // ctx.clearRect(0,top*size,this.video_width,(top+1)*size);
          ctx.fillRect(0,top*size,this.video_width,(top+1)*size);
          ctx.fillStyle="#000000";
          ctx.fillText(char_line,0,top*size); 
      }
  },
  inverseColor:function(imageData){
      var data=imageData.data;
      for(var i=0;i<data.length;i+=4){
          data[i]=255-data[i];
          data[i+1]=255-data[i+1];
          data[i+2]=255-data[i+2];
      }
      this.ctx.putImageData(imageData,0,0);
  },
  red:function(imageData){
      var data=imageData.data;
      for(var i=0;i<data.length;i+=4){
          data[i+1]=0;
          data[i+2]=0;
      }
      this.ctx.putImageData(imageData,0,0);
  },
  green:function(imageData){
      var data=imageData.data;
      for(var i=0;i<data.length;i+=4){
          data[i+0]=0;
          data[i+2]=0;
      }
      this.ctx.putImageData(imageData,0,0);
  },
  blue:function(imageData){
      var data=imageData.data;
      for(var i=0;i<data.length;i+=4){
          data[i+1]=0;
          data[i+0]=0;
      }
      this.ctx.putImageData(imageData,0,0);
  },
  mosaic:function(imageData){
      var ctx=this.ctx;
      // var canvas=this.canvas;
      var size=this.font_size;
      var data=imageData.data;
      var chars=this.chars;
      
      var w=Math.floor(this.video_width/size);
      var h=Math.floor(this.video_height/size);
      
      var top,left,top2,left2,pxId,pxId2,rgb,char_line,char;
      for(top=0;top<h;top++){
          char_line="";
          for(left=0;left<w;left++){
              rgb=[0,0,0];
              pxId=this.video_width*size*top+left*size;
              //获取块黑白值
              for(top2=0;top2<size;top2++){
                  for(left2=0;left2<size;left2++){
                      pxId2=pxId+top2*this.video_width+left2;
                      rgb[0]+=data[pxId2*4];
                      rgb[1]+=data[pxId2*4+1];
                      rgb[2]+=data[pxId2*4+2];
                  }
              }

              rgb[0]=(rgb[0]/size/size)|0;
              rgb[1]=(rgb[1]/size/size)|0;
              rgb[2]=(rgb[2]/size/size)|0;
              for(top2=0;top2<size;top2++){
                  for(left2=0;left2<size;left2++){
                      pxId2=pxId+top2*this.video_width+left2;
                      data[pxId2*4]=rgb[0];
                      data[pxId2*4+1]=rgb[1];
                      data[pxId2*4+2]=rgb[2];
                  }
              }
              //console.log(Math.floor(graw_level/this.char.length));
          }
      }
      this.ctx.putImageData(imageData,0,0);
  },
  mosaicWrong:function(imageData){
      var ctx=this.ctx;
      // var canvas=this.canvas;
      var size=this.font_size;
      var data=imageData.data;
      var chars=this.chars;

      ctx.font=size+"px "+this.font_family;
      ctx.textAlign="start";      
      ctx.textBaseline="hanging";
      
      var w=Math.floor(this.video_width/size);
      var h=Math.floor(this.video_height/size);
      
      var top,left,top2,left2,pxId,pxId2,rgb,char_line,char;
      for(top=0;top<h;top++){
          char_line="";
          for(left=0;left<w;left++){
              rgb=[0,0,0];
              pxId=this.video_width*size*top+left*size;
              //获取块黑白值
              for(top2=0;top2<size;top2++){
                  for(left2=0;left2<size;left2++){
                      pxId2=pxId+top2*size+left2;
                      rgb[0]+=data[pxId2*4];
                      rgb[1]+=data[pxId2*4+1];
                      rgb[2]+=data[pxId2*4+2];
                  }
              }

              rgb[0]=rgb[0]/size/size;
              rgb[1]=rgb[1]/size/size;
              rgb[2]=rgb[2]/size/size;
              for(top2=0;top2<size;top2++){
                  for(left2=0;left2<size;left2++){
                      pxId2=pxId+top2*size+left2;
                      data[pxId2*4]=rgb[0];
                      data[pxId2*4+1]=rgb[1];
                      data[pxId2*4+2]=rgb[2];
                  }
              }
              //console.log(Math.floor(graw_level/this.char.length));
          }
      }
      this.ctx.putImageData(imageData,0,0);
  },

  drawStart:function(){
      video_change.stop();
      video_change.interval=setInterval(function(){
        video_change.draw();
      },1000/video_change.fps);
  },
  addEvent:function(){
      this.video.addEventListener("play",video_change.drawStart);
      this.video.addEventListener("pause",video_change.stop);
  },
  removeEvent:function(){
      this.video.removeEventListener("play",video_change.drawStart);
      this.video.removeEventListener("pause",video_change.stop);
  },
  stop:function(){
      clearInterval(video_change.interval);
  },
  
  destroy:function(){
      this.stop();
      this.removeEvent();
      this.canvas.remove();
      this.canvas_box.remove();
  }
}
video_change.init()
