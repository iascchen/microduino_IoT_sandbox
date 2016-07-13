export default function extendMeteor(Meteor) {
	Meteor.callAsync = (...args) => {
		return new Promise((resolve, reject) => {
			args.push((err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
			Meteor.call.apply(Meteor, args)
		});
	};
}
