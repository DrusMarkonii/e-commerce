import { makeAutoObservable } from "mobx";
export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._devices = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 4;
    this._basketDevices = [];
    makeAutoObservable(this);
  }

  setSelectedType(type) {
    this._page = 1;
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
    this._page = 1;
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(devices) {
    this._devices = devices;
  }

  setBasketDevices(device) {
    this._basketDevices.push(device);
  }

  removeBasketDevice(device) {
    this._basketDevices = this._basketDevices.filter(
      (item) => item.id !== device.id
    );
  }

  setPage(page) {
    this._page = page;
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get devices() {
    return this._devices;
  }
  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  get basketDevices() {
    return this._basketDevices;
  }

  get page() {
    return this._page;
  }

  get totalCount() {
    return this._totalCount;
  }

  get limit() {
    return this._limit;
  }
}
