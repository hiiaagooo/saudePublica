"use strict";

const _ = require('lodash');

class BaseObject {
    constructor(data) {
        this.createdAt = new Date();
        this.updatedAt = new Date();

        if (data) {
            if (data._id) {
                this.objectId = data._id;
            }

            if (data.objectId) {
                this.objectId = data.objectId;
            }

            this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
            this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
        }
    }

    get objectId() {
        return this._objectId;
    }

    set objectId(value) {
        this._objectId = value;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(value) {
        this._createdAt = value;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(value) {
        this._updatedAt = value;
    }

    toObject() {
        let obj = {};
        _.keys(this).forEach((k) => {
            if (k.startsWith("_")) {
                let newKey = k.slice(1, k.length);
                if (this[newKey] && _.isArray(this[newKey])) {
                    obj[newKey] = this[newKey].map((obj) => {
                        if (obj && _.isFunction(obj.toObject)) {
                            return obj.toObject();
                        } else {
                            return obj;
                        }
                    });
                } else if (this[newKey] && _.isFunction(this[newKey].toObject)) {
                    obj[newKey] = this[newKey].toObject();
                } else if (this[newKey] && _.isFunction(this[newKey].toISOString)) {
                    obj[newKey] = this[newKey].toISOString();
                } else {
                    obj[newKey] = this[newKey];
                }
            }
        });
        return obj;
    }
}

module.exports = BaseObject;