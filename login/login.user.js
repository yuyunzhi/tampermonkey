// ==UserScript==
// @name         修改图片
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  修改百度图片
// @author       lambert
// @match        https://*.xiaoheiban.cn/web/*
// ==/UserScript==


(function () {
    'use strict';
    let mobile ='******'
    setTimeout(()=>{
        // 判断是否是第一次
        let hash = window.location.hash
        console.log(hash);
        if(hash.indexOf("login")>=0){
            console.log("是登录页面")
            login()
        }

    },500)

    function login(){
        // 获取 元素账号密码节点
        let input = document.getElementsByClassName("el-input__inner")
        let userNameElement = input[0]
        let passwordElement = input[1]

        // 计算密码值，把账号密码填充
        setNumber(userNameElement,Number(mobile))
        setNumber(passwordElement,getNumber())

        // 点击登录
        clickButton()
    }
    function setNumber(element, value) {
        element.focus()
        element.value = value
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("input", false, true);
        element.dispatchEvent(evt);
    }
    function clickButton(){
        let button = document.getElementsByClassName("el-button")[0]
        console.log(button)
        button.click()
    }

    function getNumber(){
        let date = new Date()
        let month = date.getMonth()+1
        month = month>=10?month:`0${month}`

        let day = date.getDate()
        day = day>=10?day:`0${day}`

        let result = `${month}${day}`
        console.log("日期",result);
        let week = date.getDay()
        week = week === 7?0:week
        console.log('星期',week);

        let arr=[]
        for(let i=0;i<4;i++){
            let sum = Number(result[i])+week
            sum = sum >=10?(sum%10):sum;
            arr.push(sum)
        }
        console.log("相加后的值",arr);
        let password = Number(arr.join(""))
        console.log("密码",password);
        return password
    }

})();

