// ==UserScript==
// @name         登录快捷
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  一统登录
// @author       OBKoro1
// @include      https://*.xiaoheiban.cn/web/*
// ==/UserScript==

/**
 * 1.1.0: 周日不加
 */

(function () {
    'use strict';
    // const account = 15021833596;
    const account = 15021833596;

    setTimeout(() => {
        isLogin() // 首次进入判断
        // 监听跳转
        window.history.onpushstate = isLogin
        // 监听后退、前进等。
        window.onhashchange = isLogin
        pushStateProxy()
    }, 500)
    function isLogin() {
        let hash = window.location.hash
        console.log('hash', hash)
        if (hash.indexOf('#/login') !== -1) {
            login()
        }
    }
    function login() {
        let inputArr = document.getElementsByTagName('input')
        let inputAccount = inputArr[0]
        let inputPassword = inputArr[1]
        handleChange(inputAccount, account)
        handleChange(inputPassword, getPassword())
        console.log('账号：', inputAccount.value)
        console.log('密码：', inputPassword.value)
        let button = Array.from(document.getElementsByTagName('button'))[0]
        button.click()
    }
    // 大坑： 因为input value限制为数字类型 需要手动触发input事件，让vue/element-ui 那层转化input类型
    function handleChange(element, value) {
        if ("createEvent" in document) {
            element.focus()
            element.value = value
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("input", false, true);
            element.dispatchEvent(evt);
        }
        else {
            element.fireEvent("input");

        }
    }
    function getPassword() {
        const time = new Date()
        const weekNum = time.getDay()
        const monthNum = time.getMonth() + 1  // 月份从0开始
        const dayNum = time.getDate()
        const res = `${addCount(monthNum)}${addCount(dayNum)}`
        // 周几和日期相加
        function addCount(num) {
            // 补0
            if (num < 10) {
                num = `0${num}`
            }
            num = String(num)
            let first = numHandle(num[0])
            let two = numHandle(num[1])
            return `${first}${two}`
        }
        // 相加超过10取十位
        function numHandle(num) {
            let res = Number(num) + weekNum
            if (res > 9) {
                res = String(res)[1]
            }
            return res
        }
        return Number(res)
    }



    // 劫持history.pushState，在调用pushState时发出一个回调
    function pushStateProxy() {
        const pushState = window.history.pushState;
        window.history.pushState = function (state) {
            // 执行监听回调
            if (typeof window.history.onpushstate === "function") {
                window.history.onpushstate({ state: state });
            }
            // 执行跳转
            return pushState.apply(window.history, arguments);
        };
    }
})();
