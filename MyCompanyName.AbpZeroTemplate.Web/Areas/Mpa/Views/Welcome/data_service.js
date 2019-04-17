'use strict';
var categoryServices;

categoryServices = angular.module('category.services', []).value('version', '0.1');

categoryServices.factory('dataService', [
    '$http', '$q', function ($http, $q) {
        var dataService;
        dataService = {
            url: {
                add_dimension_address: "/content/itembank/cid/dimension/add/",
                edit_dimension_address: "/content/itembank/cid/dimension/dimension_id/edit/",
                delete_dimension_address: "/content/itembank/cid/dimension/dimension_id/delete/",
                add_item_address: "/content/itembank/cid/dimension/did/item/add/",
                edit_item_address: "/content/itembank/cid/item/item_id/edit/",
                delete_items_address: "/content/itembank/cid/item/item_id/delete/",
                get_tenant_address: "/content/tenant/audio/score/"
            },
            handleError: function (response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return $q.reject("An unknown error occurred.");
                }
                return $q.reject(response.data.message);
            },
            handleSuccess: function (response) {
                return response.data;
            },
            get_json: function (url, handleSuccess, handleError) {
                var request;
                request = $http({
                    method: "get",
                    url: url,
                    dataType: "json",
                    cache: false
                });
                return request.then(function (result) {
                    return typeof handleSuccess === "function" ? handleSuccess(result) : void 0;
                }, this.handleError);
            },
            get_text: function (url, fid) {
                var request;
                request = $http({
                    method: "get",
                    url: url.replace(/cid/, fid),
                    dataType: "text",
                    cache: false
                });
                return request.then(this.handleSuccess, this.handleError);
            },
            post_json: function (url, data, handleSuccess, handleError) {
                var request;
                request = $http({
                    method: "post",
                    url: url,
                    dataType: "json",
                    data: angular.toJson(data),
                    headers: {
                        'X-CSRFToken': $("#csrf").children("input").val()
                    }
                });
                return request.then(function (result) {
                    return typeof handleSuccess === "function" ? handleSuccess(result) : void 0;
                }, function (xhr) {
                    return typeof handleError === "function" ? handleError(xhr) : void 0;
                });
            },
            post_text: function (url, data, fid) {
                var request;
                request = $http({
                    method: "post",
                    url: url.replace(/:(\w)+/, fid),
                    dataType: "text",
                    data: data,
                    headers: {
                        'X-CSRFToken': $("#csrf").children("input").val()
                    }
                });
                return request.then(this.handleSuccess, this.handleError);
            },
            put_json: function (url, data, fid) {
                var request;
                request = $http({
                    method: "put",
                    url: url.replace(/:(\w)+/, fid) + data.id + "/",
                    dataType: "json",
                    data: angular.toJson(data),
                    headers: {
                        'X-CSRFToken': $("#csrf").children("input").val()
                    }
                });
                return request.then(this.handleSuccess, this.handleError);
            }
        };
        return dataService;
    }
]);

categoryServices.factory('categoryBase', [
    '$http', '$rootScope', 'dataService', function ($http, $rootScope, dataService) {
        var categoryBase, createGuid;
        createGuid = function () {
            var S4;
            S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
        };
        categoryBase = {
            "cid": null,
            "did": null,
            "item": null,
            "itemId": null,
            tf: function () {
                return {
                    'code': createGuid(),
                    'kind': 'tf',
                    'difficult': 0.5,
                    'dimension': "",
                    'tags': [],
                    'content': {
                        "content": {
                            "stem": "",
                            "options": [
                                {
                                    "id": "A",
                                    "description": "正确"
                                }, {
                                    "id": "B",
                                    "description": "错误"
                                }
                            ]
                        },
                        "type": "tf",
                        "id": null,
                        "point": 1
                    },
                    'key': {
                        "score": 1,
                        "type": "tf",
                        "id": null,
                        "key": [],
                        "auto_calc": true
                    }
                };
            },
            sc: function () {
                return {
                    'code': createGuid(),
                    'kind': 'sc',
                    'difficult': 0.5,
                    'dimension': "",
                    'tags': [],
                    'content': {
                        "content": {
                            "stem": "",
                            "options": [
                                {
                                    "id": "A",
                                    "description": ""
                                }, {
                                    "id": "B",
                                    "description": ""
                                }, {
                                    "id": "C",
                                    "description": ""
                                }, {
                                    "id": "D",
                                    "description": ""
                                }
                            ]
                        },
                        "type": "sc",
                        "id": null,
                        "point": 1,
                        'scoreType': "norm"
                    },
                    'key': {
                        "score": 1,
                        "type": "sc",
                        "id": null,
                        "key": [],
                        "auto_calc": true
                    }
                };
            },
            mc: function () {
                return {
                    'code': createGuid(),
                    'kind': 'mc',
                    'difficult': 0.5,
                    'dimension': "",
                    'tags': [],
                    'content': {
                        "content": {
                            "stem": "",
                            "options": [
                                {
                                    "id": "A",
                                    "description": ""
                                }, {
                                    "id": "B",
                                    "description": ""
                                }, {
                                    "id": "C",
                                    "description": ""
                                }, {
                                    "id": "D",
                                    "description": ""
                                }
                            ]
                        },
                        "type": "mc",
                        "id": null,
                        "point": 1,
                        'scoreType': "norm"
                    },
                    'key': {
                        "score": 1,
                        "type": "mc",
                        "id": null,
                        "key": [],
                        "auto_calc": true
                    }
                };
            },
            "mq-lr": function () {
                return {
                    'code': createGuid(),
                    'kind': 'mq-lr',
                    'difficult': 0.5,
                    'dimension': "",
                    'tags': [],
                    'content': {
                        "content": {
                            "main_stem": "",
                            "items": [
                                {
                                    'code': createGuid(),
                                    'kind': 'sc',
                                    'difficult': 0.5,
                                    'content': {
                                        "content": {
                                            "stem": "",
                                            "options": [
                                                {
                                                    "id": "A",
                                                    "description": ""
                                                }, {
                                                    "id": "B",
                                                    "description": ""
                                                }, {
                                                    "id": "C",
                                                    "description": ""
                                                }, {
                                                    "id": "D",
                                                    "description": ""
                                                }
                                            ]
                                        },
                                        "type": "sc",
                                        "id": "",
                                        "point": 1,
                                        "scoreType": "norm"
                                    }
                                }
                            ],
                            "item_shuffle": false
                        },
                        "type": "mq-lr",
                        "id": "",
                        "point": 1
                    },
                    'key': {
                        "score": 1,
                        "type": "mq-lr",
                        "id": "",
                        "key": [
                            {
                                "score": 1,
                                "type": "sc",
                                "id": "",
                                "key": [],
                                "auto_calc": true,
                                "scoreType": "norm"
                            }
                        ],
                        "auto_calc": true
                    }
                };
            },
            sa: function () {
                return {
                    'code': createGuid(),
                    'old_code': null,
                    'kind': 'sa',
                    'difficult': 0.5,
                    'dimension': "",
                    'tags': [],
                    'content': {
                        "content": {
                            "main_stem": ""
                        },
                        "type": "sa",
                        "id": null,
                        "point": 1
                    },
                    'key': {
                        "score": 1,
                        "type": "sa",
                        "id": null,
                        "key": [],
                        "auto_calc": false
                    }
                };
            },
            "mq-in": function () {
                return {
                    'code': createGuid(),
                    'old_code': null,
                    'kind': 'mq-in',
                    'difficult': 0,
                    'dimension': "",
                    'tags': [],
                    'content': {
                        "content": {
                            "main_stem": "",
                            "items": []
                        },
                        "type": "mq-in",
                        "id": null,
                        "point": 0
                    },
                    "key": {
                        'key': [],
                        "score": 0,
                        "type": "mq-in",
                        "id": "",
                        "auto_calc": false
                    }
                };
            },
            "mq-in-sc": function () {
                return {
                    'code': createGuid(),
                    'old_code': null,
                    'kind': 'mq-in-sc',
                    'difficult': 0,
                    'dimension': "",
                    'tags': [],
                    'content': {
                        "content": {
                            "main_stem": "",
                            "items": []
                        },
                        "type": "mq-in-sc",
                        "id": null,
                        "point": 0
                    },
                    "key": {
                        'key': [],
                        "score": 0,
                        "type": "mq-in-sc",
                        "id": "",
                        "auto_calc": true
                    }
                };
            },
            "mq-drop": function () {
                return {
                    'code': createGuid(),
                    'old_code': null,
                    'kind': 'mq-drop',
                    'difficult': 0,
                    'dimension': "",
                    'tags': [],
                    'content': {
                        "content": {
                            "main_stem": "",
                            "items": [],
                            "drop_options": [
                                {
                                    "id": "A",
                                    "description": ""
                                }
                            ],
                            "drop_options_shuffle": false
                        },
                        "type": "mq-drop",
                        "id": null,
                        "point": 0
                    },
                    "key": {
                        'key': [],
                        "score": 0,
                        "type": "mq-drop",
                        "id": "",
                        'analysis': "",
                        "auto_calc": true
                    }
                };
            },
            "speak": function () {
                return {
                    'code': createGuid(),
                    'kind': 'speak',
                    'dimension': "",
                    'difficult': 0.5,
                    'tags': [],
                    'content': {
                        'content': {
                            'duration': 30,
                            'stem': "",
                            'recog_type': "manual"
                        },
                        'id': null,
                        'point': 1,
                        'type': "speak"
                    },
                    'key': {
                        'analysis': "",
                        'auto_calc': false,
                        'id': null,
                        'key': [""],
                        'reference': "",
                        'score': 1,
                        'type': "speak"
                    }
                };
            }
        };
        categoryBase.get_tenant = function (itemId, handleSuccess) {
            var url;
            url = dataService.url.get_tenant_address.replace(/cid/, categoryBase.cid).replace(/item_id/, itemId);
            return dataService.get_json(url, handleSuccess);
        };
        categoryBase.add_item = function (data, handleSuccess, errorCallback) {
            var url;
            url = dataService.url.add_item_address.replace(/cid/, categoryBase.cid).replace(/did/, categoryBase.didCur);
            return dataService.post_json(url, data, handleSuccess, errorCallback);
        };
        categoryBase.get_item = function (itemId, handleSuccess) {
            var url;
            url = dataService.url.edit_item_address.replace(/cid/, categoryBase.cid).replace(/item_id/, itemId);
            return dataService.get_json(url, handleSuccess);
        };
        categoryBase.save_edit_item = function (itemId, data, handleSuccess, errorCallback) {
            var url;
            url = dataService.url.edit_item_address.replace(/cid/, categoryBase.cid).replace(/item_id/, itemId);
            return dataService.post_json(url, data, handleSuccess, errorCallback);
        };
        categoryBase.delete_item = function (idObj, handleSuccess) {
            var url;
            url = dataService.url.delete_items_address.replace(/cid/, categoryBase.cid).replace(/item_id/, idObj);
            return dataService.post_json(url, null, handleSuccess);
        };
        categoryBase.save_key = function (item) {
            var allOpts, checkedOpt, checkedOpts, group, i, index, k, keyObj, keyStr, obj, opt, optPoints, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _results;
            item.key.score = item.content.point;
            if (item.kind === "sc" || item.kind === "mc" || item.kind === "tf") {
                item.key.key = [];
                checkedOpts = $("input[name=" + item.code + "]:checked");
                optPoints = $(".each-config-opt input");
                if (item.kind === "mc") {
                    allOpts = $(".item-opts .ez-checkbox-right input[type='checkbox']");
                } else if (item.kind === "sc" && item.content.scoreType === "each_score") {
                    allOpts = $(".item-opts .ez-radio-right input[type='checkbox']");
                }
                if (checkedOpts.length > 0) {
                    keyStr = "";
                    if ((item.kind === "sc" || item.kind === "mc") && $(".item-edit-config").find("#scoreType").get(0).value === "each_score") {
                        for (index = _i = 0, _len = allOpts.length; _i < _len; index = ++_i) {
                            opt = allOpts[index];
                            keyStr = $(opt).val();
                            if ($(optPoints)[index]) {
                                keyObj = {};
                                keyObj[keyStr] = Number($(optPoints)[index].value);
                                item.key.key.push(keyObj);
                            }
                        }
                    } else {
                        for (_j = 0, _len1 = checkedOpts.length; _j < _len1; _j++) {
                            checkedOpt = checkedOpts[_j];
                            keyStr += $(checkedOpt).val();
                        }
                        keyObj = {};
                        keyObj[keyStr] = item.content.point;
                        item.key.key.push(keyObj);
                    }
                    return console.log("item.key.key", item.key.key);
                }
            } else if (item.kind === "mq-lr" || item.kind === "mq-in-sc" || item.kind === "mq-drop") {
                _ref = item.content.content.items;
                _results = [];
                for (i = _k = 0, _len2 = _ref.length; _k < _len2; i = ++_k) {
                    obj = _ref[i];
                    item.key.key[i].id = item.content.content.items[i].code;
                    item.key.key[i].score = item.content.content.items[i].content.point;
                    item.key.key[i].point = item.content.content.items[i].content.point;
                    item.content.content.items[i].content.id = item.content.content.items[i].code;
                    if (item.content.content.items[i].kind === "sc" || item.content.content.items[i].kind === "mc" || item.content.content.items[i].kind === "tf") {
                        item.key.key[i].key = [];
                        if (item.kind === "mq-drop") {
                            keyStr = $("." + item.content.content.items[i].code).find(".key").text();
                            keyObj = {};
                            keyObj[keyStr] = item.content.content.items[i].content.point;
                            _results.push(item.key.key[i].key.push(keyObj));
                        } else {
                            checkedOpts = $("input[name=" + item.content.content.items[i].code + "]:checked");
                            keyStr = "";
                            if (checkedOpts.length > 0) {
                                if (item.content.content.items[i].content.scoreType === "each_score") {
                                    optPoints = $("input[data-code=" + item.content.content.items[i].code + "]");
                                    allOpts = $("input[name=" + item.content.content.items[i].code + "]");
                                    _results.push((function () {
                                        var _l, _len3, _results1;
                                        _results1 = [];
                                        for (index = _l = 0, _len3 = allOpts.length; _l < _len3; index = ++_l) {
                                            opt = allOpts[index];
                                            keyStr = $(opt).val();
                                            if ($(optPoints)[index]) {
                                                keyObj = {};
                                                keyObj[keyStr] = Number($(optPoints)[index].value);
                                                _results1.push(item.key.key[i].key.push(keyObj));
                                            } else {
                                                _results1.push(void 0);
                                            }
                                        }
                                        return _results1;
                                    })());
                                } else {
                                    for (_l = 0, _len3 = checkedOpts.length; _l < _len3; _l++) {
                                        checkedOpt = checkedOpts[_l];
                                        keyStr += $(checkedOpt).val();
                                    }
                                    keyObj = {};
                                    keyObj[keyStr] = item.content.content.items[i].content.point;
                                    _results.push(item.key.key[i].key.push(keyObj));
                                }
                            } else {
                                _results.push(void 0);
                            }
                        }
                    } else if (item.content.content.items[i].kind === "sa") {
                        if (item.key.key[i].reference) {
                            _results.push(item.key.key[i].key = [item.key.key[i].reference.replace(/<img\b[^>]*>/, "")]);
                        } else {
                            _results.push(void 0);
                        }
                    } else {
                        _results.push(void 0);
                    }
                }
                return _results;
            } else if (item.kind === "mq-in") {
                group = [];
                _ref1 = item.key.key;
                for (_m = 0, _len4 = _ref1.length; _m < _len4; _m++) {
                    k = _ref1[_m];
                    k.score = parseFloat(k.score);
                    k.reference = k.key.join(",");
                    group.push(k.id);
                }
                if (item.key.option_group) {
                    item.key.group = [];
                    return item.key.group.push(group);
                } else {
                    return delete item.key.group;
                }
            } else if (item.kind === "sa") {
                if (item.key.reference) {
                    return item.key.key = [item.key.reference.replace(/<img\b[^>]*>/, "")];
                }
            } else if (item.kind === "speak") {
                return item.key.recog_type = item.content.content.recog_type;
            }
        };
        categoryBase.refreshStemIndex = function (item) {
            var index, newInput1, newInput2, reg1, reg2, sub_item, _i, _len, _ref, _results;
            if (item.kind === "mq-in" || item.kind === "mq-in-sc" || item.kind === "mq-drop") {
                index = 1;
                _ref = item.content.content.items;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    sub_item = _ref[_i];
                    index++;
                    reg1 = new RegExp("<span(\\s)+(contenteditable=[\"|\']false[\"|\'](\\s))?qid=[\"|\']" + sub_item.code + "[\"|\']>(\\s)*(\\d)*(\\s)*<\/span>", "gim");
                    newInput1 = "<input id='" + sub_item.code + "' disabled='disabled' type='text' placeholder='" + (index - 1) + "'>";
                    item.content.content.main_stem = item.content.content.main_stem.replace(reg1, newInput1);
                    reg2 = new RegExp("<input(\\s)+[^>]*id=[\"|\']" + sub_item.code + "[\"|\'][^>]*>", "gim");
                    newInput2 = "<input id='" + sub_item.code + "' disabled='disabled' type='text' placeholder='" + (index - 1) + "'>";
                    _results.push(item.content.content.main_stem = item.content.content.main_stem.replace(reg2, newInput2));
                }
                return _results;
            }
        };
        return categoryBase;
    }
]);
