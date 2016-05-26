# microduino_IoT_sandbox Tasks

## Tasks 

1. [ ] 智能车位 
1. [ ] 智能门锁 
1. [ ] 智能窗户 
1. [ ] 智能安防报警器
1. [ ] 智能红外遥控器 
1. [ ] 智能插座 
1. [ ] 智能彩虹灯 
1. [ ] 智能Wifi气象站 
1. [ ] 智能信息显示时钟 
1. [ ] 智能 Wifi 音响 

## Details Requirements

### 智能车位 

采用 光线传感器 实现。

* 当车位被占用时（光线值小于阈值），状态： using = true。
* 当车位被空出时（光线值大于阈值），状态： using = false。

每隔1s检查一次。如果发生状态变化，及时向Server发送数据状态；如果状态无变化，每 10s 向Server发送JSON消息。

设备端状态上传的例子 ：

    { device_id："%device_id%"， using:"true" }

此设备不需支持 Server 端控制。

    接收：

    { cmd:"dq"，token:"%device_secret_token%" }

    返回：

    { device_id："%device_id%", cmd:"dq"，controls: [] }

### 智能门锁

使用 NFC 传感器、舵机、霍尔传感器、磁铁 实现。

* 当 nfc 靠近时，驱动舵机开门。10s之后自动关门。
* 利用霍尔传感器和磁铁感应门窗的关闭与否，修改状态： opening = false 或 opening = true。

每隔1s检查一次。如果 open 发生状态变化，及时向Server发送数据状态；如果状态无变化，每 10s 向Server发送JSON消息。

设备端状态上传的例子 ：

    { device_id："%device_id%"， opening:"true／false" }
    
此设备支持 Server 端控制。

* 接收

        { cmd:"dq"，token:"%device_secret_token%"}

    返回：

        { device_id："%device_id%", cmd:"dq"，
            controls: [
            { name:"open", type:"boolean"}
            ] } 

* 接收

        { cmd:"cm", token:"%device_secret_token%"， open: "true／false" }
      
    根据 Device 状态，确定是否驱动舵机开关门。

### 智能窗户

使用 舵机、霍尔传感器、磁铁 实现。行为与智能门锁基本一致。

* 利用霍尔传感器和磁铁感应门窗的关闭与否，修改状态： opening = false 或 opening = true。

每隔1s检查一次。如果 open 发生状态变化，及时向Server发送数据状态；如果状态无变化，每 10s 向Server发送JSON消息。

设备端状态上传的例子 ：

    { device_id："%device_id%"， opening:"true／false"}
    
此设备支持 Server 端控制。

* 接收

        { cmd:"dq"，token:"%device_secret_token%"}
    
    返回： 
    
        { device_id："%device_id%", cmd:"dq"，controls: [
            { name:"open", type:"boolean"}
            ] }

* 接收 

        { cmd:"cm", token:"%device_secret_token%"， open: "true／false" }
      
    根据 Device 当前状态，确定是否驱动舵机开关窗。

### 智能安防报警器

使用 PIR 传感器、蜂鸣器 实现。

* 安防设备，每隔10s向云端报告当前安防状态。

        { device_id："%device_id%"，enabled:"true／false"}

* 云端控制安防启停。例如，当智能车位为空时，自动认为处于主人离家状态、云端自动启动安防。

    * 安防启动时，PIR 发现有红外运动时，蜂鸣器鸣响告警10s。向 Server 告警。Server向手机告警。
    * 安防启动时，智能门锁发现门开时，Server 驱动 蜂鸣器 鸣响告警10s。Server向手机告警。
    * 安防启动时，智能窗户发现窗开时，Server 驱动 蜂鸣器 鸣响告警10s。Server向手机告警。

    设备端报警上传目前仅有 EQ_PIR 事件 ：

        { device_id："%device_id%"，token:"%device_secret_token%"，event:"EQ_PIR"}

    
此设备支持 Server 端控制。

* 接收

        { cmd:"dq"，token:"%device_secret_token%"}
    
   返回： 
    
        { device_id："%device_id%", cmd:"dq"，
            controls: [
            { name:"enable", type:"boolean"}， 
            { name:"warn", type:"boolean"}] ，
            events: ["EQ_PIR"]}

* 当收到

        { cmd:"cm", token:"%device_secret_token%"， enable: "true／false" }
   
    根据 enable 值，启停安防。

* 当收到
    
        { cmd:"cm", token:"%device_secret_token%"， warn: "true／false" }
      
    根据 warn 值，驱动 蜂鸣器 鸣响告警10s。

### 智能红外遥控器

使用 红外发射 实现。模拟与老旧设备操控场景。打开一个家电。

* 此设备无本地状态数据上传云端。接收到 cmd:"cs" 时，不回应即可。

        { cmd:"cs"，token:"%device_secret_token%"}
    
此设备支持 Server 端控制。

* 接收到

        { cmd:"dq"，token:"%device_secret_token%"}
        
    返回：
    
        { device_id："%device_id%", cmd:"dq"，
            controls: [
            { name:"send", type:"number"}
            ] }

* 当收到 

        { cmd:"cm", token:"%device_secret_token%"， send: "1/2/3/4／。。。" }
     
    根据 send 值，发射对应编号的红外信号。

### 智能插座

使用 继电器 实现。模拟与老旧设备操控场景。打开一个家电。

设备端状态上传的例子 ：

    { device_id："%device_id%"， powered:"true／false"}
    
此设备支持 Server 端控制。

* 接收到

        { cmd:"dq"，token:"%device_secret_token%"}

    返回：
    
        { device_id："%device_id%", cmd:"dq"，
            controls: [
            { name:"power", type:"boolean"}
            ] }

* 当收到 

        { cmd:"cm", token:"%device_secret_token%"， power: "true／false" }
      
  根据 power 值，通断继电器。

### 智能彩虹灯

使用 彩色LED、声音传感器（Mic）、光线传感器 实现。

设备端状态上传的例子 ：

    { device_id："%device_id%"， inMode: "MO/MF/MR/MV#ffffff/MC#ffffff／ML#ffffff"}
    
设备端上传事件例子：

    { device_id："%device_id%"，token:"%device_secret_token%"， event:"GT_temperature"}
    { device_id："%device_id%"，token:"%device_secret_token%"， event:"LT_temperature"}
    
此设备支持 Server 端控制。

* 接收到

        { cmd:"dq"，token:"%device_secret_token%"}
      
  返回： 
    
        { device_id："%device_id%", cmd:"dq"，
            controls: [
            { name:"mode", type:"String"}，
            { name:"setting", type:"JSON"}] ，
            events: ["GT_Lightness"，"LT_Lightness"]}

* 当收到 

        {  cmd:"cm", token:"%device_secret_token%"， mode: "MO/MF/MR/MV#ffffff/MC#ffffff／EL#ffffff" }
      
  根据 mode 值，设置颜色。
  
        * MO：OFF，关灯
        * MF：Flash，炫彩闪烁
        * MR：MRainbow，彩虹灯
        * MV：Voice＃颜色值，根据声强闪烁
        * MC：Color＃颜色值，单色灯
        * ML：Light#颜色值，根据光线阈值变化触发的事件，自动开关灯。GT－》关灯，LT－》开灯
      
* 当收到 

        { cmd:"cm", token:"%device_secret_token%"， setting: {  GT_Lightness:"1000", LT_Lightness:"600"} }
      
    根据 setting 值设置各种阈值。


### 智能气象站

使用 温湿度、光线、气压、雾霾、有害气体、GPS 传感器实现。

设备端状态上传的例子 ：

    { device_id："%device_id%"， temperature：“”，humity:"", lightness:"", pm:"" , posion："" ，gps：“” }
    
设备端事件上传的例子 ：
    
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"GT_temperature"}
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"LT_temperature"}
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"GT_humity"}
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"LT_humity"}
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"GT_Lightness"}
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"LT_Lightness"}
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"GT_pm"}
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"LT_pm"}
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"GT_posion"}
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"LT_posion"}
    
    
此设备支持 Server 端控制。

* 接收到{ cmd:"dq"，token:"%device_secret_token%"}时，返回： 
    
        { device_id："%device_id%", cmd:"dq"，
            controls: [
            { name:"setting", type:"JSON"}] ，
            events: [ “GT_temperature“，"LT_temperature"，"GT_humity"， "LT_humity"，
            "GT_Lightness" ， "LT_Lightness"， "GT_pm"， "LT_pm"，"GT_posion"，"LT_posion" ] }

* 当收到 

        { cmd:"cm", token:"%device_secret_token%"，
            setting: {
            GT_temperature:"40" , LT_temperature:"13" , GT_humity:"80", LT_humity:"40",
            GT_Lightness:"1000", LT_Lightness:"600", 。。。} }
      
    根据 setting 值设置各种阈值。

### 智能信息显示时钟

使用 LED点阵、RTC 传感器实现。

滚动显示所指定的设备的数据、状态、事件等。

此设备端状态不需上传。
    
设备端事件上传的例子 ：
    
    { device_id："%device_id%"，token:"%device_secret_token%"，event:"EQ_Time"}
    
此设备支持 Server 端控制。

* 接收到{ cmd:"dq"，token:"%device_secret_token%"}时，返回： 
    
        { device_id："%device_id%", cmd:"dq"，
            controls: [
            { name:"message", type:"String"}，
            { name:"color", type:"String"}，
            { name:"picture", type:"Binary"}，
            { name:"syncTime", type:"String"}，
            { name:"alert", type:"JSON"}]，
            events: [ “EQ_Time“ ] }  }

* 当收到 

        { cmd:"cm", token:"%device_secret_token%"， message: “text String”, color: "#ffffff" }
      
    在屏幕上显示文字。
  
* 当收到 

        { cmd:"cm", token:"%device_secret_token%"， picture: “base64_binary” }
      
    在屏幕上显示图像。
  
* 当收到 

        { cmd:"cm", token:"%device_secret_token%"， syncTime: “%time_string%” }
      
    在屏幕上显示。
  
* 当收到 

        { cmd:"cm", token:"%device_secret_token%"， alert: {
            op:"add", name:"alert_name", time:"%time_string%" , loop:"One_Time/daily/day#1-7/weekly/monthly/annual"} }
      
    增加一个Alert。
  
* 当收到 

        { cmd:"cm", token:"%device_secret_token%"，
      alert: {  op:"del", name:"alert_name"} }
      
    删除一个Alert。

### 智能 Wifi 音响

基于 Audio 模块实现

设备端状态上传的例子 ：

    { device_id："%device_id%"， playing：“2”，volumn:"80", paused:"true／false" }

此设备支持 Server 端控制。

* 接收到

        { cmd:"dq"，token:"%device_secret_token%"}
   
    返回：
    
        { device_id："%device_id%", cmd:"dq"，
            controls: [
            { name:"play", type:"Number"}，
            { name:"pause", type:"boolean"}，
            { name:"volumn", type:"Number"}］ }

* 当收到 

        { cmd:"cm", token:"%device_secret_token%"， play: 2， volumn: 80 }
      
    以80%的音量，播放第2首歌，paused 标记自动设置为 false。

* 当收到 

        { cmd:"cm", token:"%device_secret_token%"， pause: “true“ }
      
    暂停播放。

