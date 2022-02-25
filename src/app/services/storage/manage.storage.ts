import { Storage, StoragePlugin } from '@capacitor/storage';
import { environment } from '../../../environments/environment';
import * as _ from "lodash";

export class ManageStorage {

	private storage: StoragePlugin;
	private storageKey: string = environment.appId;
	private storageData: any;

	constructor() {
		this.storage = Storage;

		return this;
	}

	async set(name: string, value: any) {
		try{
			let response: boolean | Error = false;
			let currStorageValue: any = {};

			this.storageData = await this.get(this.storageKey);

			if (_.isEmpty(this.storageData)) {
				currStorageValue[name] = value;
				await this.storage.set({
					key: this.storageKey,
					value: currStorageValue,
				});
			} else {
				currStorageValue = this.storageData || null;
			}

			currStorageValue[name] = value;

			await this.storage.set({ key: this.storageKey, value: JSON.stringify(currStorageValue) })
				.then(() => response = true)
				.catch((err: Error) => response = err);

			return response;
		}catch(err: any){
			console.log(`ManageStorage > set > catch::err`, err);
			return false;
		}
	};

	async keys() {
		return await this.storage.keys();
	};

	async get(name: string) {
		const response: any = await this.storage.get({ key: this.storageKey });
		const currStorageValue: any = JSON.parse(response.value) || null;

		if (!_.isEmpty(currStorageValue) && (name in currStorageValue))
			return currStorageValue[name];

		return currStorageValue;
	};

	async remove(name: string) {
		await this.storage.remove({ key: name });
	};
}