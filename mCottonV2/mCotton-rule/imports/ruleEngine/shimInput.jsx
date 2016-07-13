export function shimInput(name) {
	if (typeof name === 'string') {
		return {
			name,
			type: 'string',
		}
	} else {
		return name;
	}
}
export function shimDevice(device) {
	const dp = device.deviceProfile;
	
	const datas = (dp.dataNames || []).map(shimInput);
	const controls = dp.controlNames || [];
	
	return { datas, controls };
}

export function deviceHasIO(device) {
	const dp = device.deviceProfile;
	if (!dp) {
		return false;
	}
	return (dp.dataNames && dp.dataNames.length > 0) || (dp.controlNames && dp.controlNames.length > 0)
}
