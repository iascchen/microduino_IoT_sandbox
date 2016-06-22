# microduino_IoT_sandbox Requirements

参考:
http://www.ubiworx.com/ubiworx/restful-api#get-sensors
https://msdn.microsoft.com/zh-cn/library/azure/mt548492.aspx

## mCotton API 端

### Register Device

Mobile APP  ===========>  mCotton

Mobile APP 向 mCotton 请求一个新的 Device ID、Token

	GET /iotapi/v1.0/r
	
	条件:User 已经登陆
	
	参数消息:无
	
	mCotton 行为: 为此用户创建新的设备，生成 Device ID、Token，并返回给 Mobile APP。
	
	返回: 
	{
		device_id:"%device_id%",			//M
		token:"%device_secret_token%" 		//M
	}
          
### Upload Data

Device  ===========>  mCotton

Device 状态数据上传, 向mCotton发送数据状态 JSON 消息:

	POST /iotapi/v1.0/d

	条件: 无
	
	参数消息: 
	{ 
		device_id:"%device_id%",			//M
		token:"%device_secret_token%", 		//M
		project_id:"%project_id%", 			//O
		battery: "80"                       //M
		％data_name％:"％data_value％",	
		...
	}
	
	说明:project_id is Option
	
### Upload Event

Device  ===========>  mCotton

Device 事件上传, 向mCotton发送数据状态 JSON 消息:

	POST /iotapi/v1.0/e

	条件: 无
	
	参数消息:
	
	{ 	
		device_id:"%device_id%",			//M
		token:"%device_secret_token%", 		//M
		project_id:"%project_id%", 			//O
		battery: "80"                       //M
		event:"％event_name％"
	}
	
	说明: project_id is Option
          
## Microduino IoT 端
       
Device  <===========  mCotton

### Device Query

通过云端，补充设备的信息。具体信息为设备的:数据类型、控制端口、发出事件等。
     
mCotton 向 设备发送 JSON 消息：
    
	{
		cmd:"dq"，							//M
		token:"%device_secret_token%"		//M
	}
    
设备端向mCotton返回 JSON 消息。其中 data_type 如: “String”，“Number”， “Boolean”， “JSON” ， “Binary” 等 :

	{
		cmd:"dq"，							//M
		device_id:"%device_id%", 			//M
		project_id: "%related_project%",	//O
		datas: [
			{ name:"％data_name％", type:"%data_type%", desc:"%data_desc%"}，
			{ ... }],						//O
		controls: [
			{ name:"％control_name％", type:"%data_type%", desc:"%data_desc%"}，
			{ ... }],						//O
		events: [
			"％event_name％", 
			...]							//O
    }

### Reset Token

从云端发起，用于更新设备端 device_secret_token 

mCotton 向 设备发送 JSON 消息 
    
	{ 
		cmd:"rt", 								//M
		token:"%device_secret_token%"，			//M
		new_token：“％new_device_secret_token%"	//M
	}
        
Device 收到后，需要向 mCotton 回复确认
    
	{ 
		cmd:"rt"，								//M
		device_id："%device_id%"，				//M
		token:"%new_device_secret_token%"		//M
	}

### Setting Keep Live Interval

从云端发起，用于更新设备端 Keep Live Interval, heart beat

mCotton 向 设备发送 JSON 消息

    {
        cmd:"hb", 								//M
        token:"%device_secret_token%"，			//M
        keep_live：“％new_interval%"          	//M
    }

Device 收到后，需要向 mCotton 回复确认

    {
        cmd:"hb"，								//M
        device_id："%device_id%"，				//M
        keep_live：“％new_interval%"             //M
    }

### Current Status

设备数据状态查询。

mCotton 向 设备发送 JSON 消息, 强制设备端向mCotton发起一次设备端状态数据上传。 
     
mCotton 向 设备发送 JSON 消息：
    
	{
		cmd:"cs"，						//M
		token:"%device_secret_token%"	//M
	}
    
设备端根据当前状况调用：

	POST /iotapi/v1.0/d

### Control Message

命令控制。

mCotton 向 设备发送 JSON 消息, 对设备进行控制。 
     
mCotton 向 设备发送 JSON 消息：
    
	{
		cmd:"cm"，						//M
		token:"%device_secret_token%"	//M
		％control_name％: "%control_value%", 
		...
	}

设备端根据命令完成对应操作。        
        
## 手机／Web App（TBD）

### 用户注册

注册 Microduino 用户。

### 用户登录

登录 Microduino 用户

### Wifi 设备 SmartConfig 注册

利用 **已经登陆** 的 Mobile App 设置 Wifi 设备的 SSID、password。
并为当前设备申请 Device ID、Token。

### BLE 设备 注册

利用 **已经登陆** 的 Mobile App，为本地发现的 BLE 设备申请／选择 Device ID、Token，存放在手机上。

## IoT Gateway 端

为 Device 提供一个 SSL Tunnel 到 mCotton

