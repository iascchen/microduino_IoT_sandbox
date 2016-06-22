# microduino_IoT_sandbox Protocol

## Wifi网络连接

* 支持 SmartConfig 设置 Wifi 连接方式
* 断电重启后参数不受影响。

### SmartConfig状态进入

长按触碰开关 5s ，可以进入 Device Reset 过程，执行 SmartConfig。

SmartConfig 配置完成之后能够获得以下信息, 这些信息需要被存储在 EPROM 中：

* wifi_ssid
* wifi_password
* deviceId （Server端创建） 
* deviceToken（Server端创建）

## Server 与 Device 的通讯协议

Device 接收到 Server 发来的控制消息，产生相应的反馈。与 Server 通讯使用 WebSocket 实现。

### Device 状态上传

* 设备端状态数据上传：向Server发送数据状态 JSON 消息：

        { deviceId："%deviceId%"，projectId:"%projectId%", token:"%deviceToken%"， ％data_name％:"％data_value％"，。。。}。

    ** 注意：** 由于是Demo，Device 每隔1s检查一次。如果发生状态变化，及时向Server发送数据状态；如果状态无变化，每 10s 向Server发送JSON消息。
    
* 设备端事件上传：向Server发送事件 JSON 消息，这些事件包括控制器触碰、数据抵达阈值等：

        { deviceId："%deviceId%"，projectId:"%projectId%"，token:"%deviceToken%"， event：％event_name％}。

    ％event_name％ 有格式约定：
    
    * GT_ : 大于某数值
    * LT_ : 小于某数值
    * EQ_ : 等于某数值
    * IN_ ：位于某集合中

### Server 端控制下行

出于安全考虑，所有下行指令均需要带 deviceToken，供 Device 端比对确认。

* 设备数据状态查询：Server 向 设备发送 JSON 消息, 强制设备端向Server发起一次设备端状态数据上传。 

        {cmd:"cs"，token:"%deviceToken%"}

* 控制命令：Server 向 设备发送 JSON 消息 

        { cmd:"cm", token:"%deviceToken%"， ％control_name％: "%control_value%", ...}

* 设备信息查询：

    Server 向 设备发送 JSON 消息
    
        { cmd:"dq"，token:"%deviceToken%"}
    
    设备端向Server返回 JSON 消息。其中 X_data_type 如： “String”，“Number”， “Boolean”， “JSON” ， “Binary” 等 :

        {
            deviceId："%deviceId%", cmd:"dq"，
            projectId: "%related_project%",
            deviceProfile: {
                dataNames: ["enabled", ...],
                controlNames: [
                    {
                        name: "mode", type: "enum",
                            values: [
                                { label: "OFF", value: "MO" },
                                { label: "Color", value: "MC" },
                                { label: "Flash", value: "MF" },
                                { label: "Rainbow", value: "MR" },
                                { label: "Voice", value: "MV" },
                                { label: "Lightness", value: "EL" }]
                            },
                        { name: "color", type: "string" },
                        { name: "setting", type: "json" }],
                eventNames: ["EQ_PIR", ...]
            }
        }

* 更新 deviceToken 

    Server 向 设备发送 JSON 消息 
    
        {ccmd:"rt", token:"%deviceToken%"，new_token：“％new_deviceToken%"}
        
    Device 收到后，需要向 Server 回复确认
    
        {cdeviceId："%deviceId%"，cmd:"rt"，token:"%new_deviceToken%"}。

缩略语

* dq 是 Device Query 的简写。
* cs 是 Current Status 的简写。
* cm 是 Control Message 的简写。
* rt 是 Reset Token 的简写。
