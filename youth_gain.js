/*
更新时间: 2021-02-26 11:32
Github Actions使用方法见[@lxk0301](https://raw.githubusercontent.com/lxk0301/scripts/master/githubAction.md) 使用方法大同小异

中青看点浏览赚任务，手动完成任务，获取请求体，支持boxjs及Github Actions，多请求用"&"分开，点击任务，支持自动获取请求

https:\/\/ios\.baertt\.com\/v5\/task\/browse_start\.json url script-request-body youth_gain.js

https:\/\/ios\.baertt\.com\/v5\/Nameless\/adlickstart\.json url script-request-body youth_gain.js


多个请求体时用'&'号或者换行隔开"，本脚本可自动删除失效请求，请须知 ‼️

*/


const $ = new Env("中青看点浏览赚&看看赚")
//const notify = $.isNode() ? require('./sendNotify') : '';
let startArr = [], lookArr=[];
let gainscore = 0, lookscore = 0;
let StartBody = [],LookBody = [];
let startbodys = $.getdata('youth_start')||'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBDkaZBl5rxMwdWL1_icxdgLotHNNcJcW25hvfK_fN61-LobnK3HH-2uye-P500FCJH89IuxV7uE_Wyx8QLgCx1GCFwK7k_slANzhEeJCwKUOqOsrgTkUgEqsj9MIDWHtVF20ZApAQudhRv2SYUqyTX2UhnCF6V1oDpqcYuG9CxuJRRcu9RtGLbB1ViK866NVK62_aUjxg2CnPG0xr8fyV-NGIGSyWfmya5KK4q4Yq5YRsGeWHgDlxHZAHo64DPO5-uW58n9oHgRxnUbWFNg-JfPHIEXzPvpS8ZGz00WlR1ZSeuGzjjTLSena4VX4C_WfmiXz2dsLKx8kk80oB7JvIoXnfAHqOzm00oghvf3heuFUhiFCx_J8PT4vKvGl_jmeaMZAj4-cffiQy8iQNSSba5xRz9cSuY2aO2AbueaIjbjTVN2kyutHcghB6hnWdpS8c9JQo70gNKajnfqyodor372X2fKUpDyTtm3Uf9bvZg0OwVsjQabTsu5UCqfZbdH1JRkPGqaRy77Qzb-0lSDdzxI4xsJK_KI-uD7AusrFI_a0YSzqqamhXYwXGCOkVXxnDuC5oKuc69zVE3D4ZZJLyjcNm4LAnIhqGD28xH4EUj7f7kP-O05KpYzpgfdp1pSXq10054HX0ingzNorA8DYXar4DZlQ9okgqH8msHUYgpC3TCKpUepRsAJ&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBDkaZBl5rxMwdWL1_icxdgLotHNNcJcW25hvfK_fN61-LobnK3HH-2uye-P500FCJH89IuxV7uE_Wyx8QLgCx1GCFwK7k_slANzhEeJCwKUOqOsrgTkUgEqsj9MIDWHtVGU_mC_5Et-syTDjyxpCPpN3xCHFN9kgyy6Ghd_Xjnx7HQjKiW5SSAcqLovtdMuTOTMG--SClHqwWHLCdhRO5weUdZq7k6Ts9BxdPakN0zSVk4KxyOeBYsj_YVFsOPcB2u8pV8GODEXJZ0kFtX0s1XGCPrrNfIQspDNkxKQQOERoSCnBor9I0M_MEgTSOdsluZ7t3Or3YGj5fw_5oOE5nQ3hCBL7GO8DhRBuAPs7PloM5cfbXe6naH68W6tn5K1Ic6rMx1tIyCG-rOk9dj4wUX_et2Gg_xlGBQdi0rHxCB_7i_lLxlcKRSjcaQm51ZKOfkeC4wLHpxpLchy32-crF4o_AKZuahs_bA3Cwtrq4V9LwAvz4fy2uWzf-zvAB0n6OxjXMlW_hn8pY0m1edMbLkJNwote65GB8HvifnWvPFL1VR7taOWngQrPhxED2TnAjkSMyyUGNxRyD6J8p9j3UAbmgDww-O3x-z-QS7IjGZG_YDy1zBsZQ-_GGHWVuPfbxcP92D2hPk2A1Y-VLfZnY3mELANIVtMlm8iQly8znJuHo1fcyszr8il'
let lookbodys = $.getdata('youth_look')||'p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT02QUYS9FDuZgJH4xopJvorPhi9AmnyHdT5YwPAKOZTPud5cKGnnA0kVYP3nkc4ZNhy-r01UbDm6Zea74IqFZ1a1IE3g4x912tVOTpnooRg6cNjw7pOhoO2aECGhZi6J1B5T5QvBeEVILgOD8yH2XXWdpKtoSDclZORMriFQGwo3dN88q7aDfSeFHJ79uqKSa1U3hyE2_3Hg7v0OXi0R6r8Zh4MuKA35ewS9f5HhUm1QNj6ozF1HeLFOK0G6thn5EHqnIcISgMb_yfqUnfJFFKMSgkgqWShlI9DRWrRWFg8GbwGhdfbyYjIhP7YCvYqgcvhpVR3Z6VgLlcnM3fWNM2-E0OnrDwsL6mYPmn5_jXTV0DwGiiTgabC5im9XKOeKwHvdsiGNKkgzaRtjC-4VlfLKKMttP_FrLGO-knkrT2pIRRvCb5ZgFq9Q%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT02QUYS9FDuZgJH4xopJvorPhi9AmnyHdT5YwPAKOZTPvseUQzxFdDqjE0Tkcx8AQQZ2Dpnfst2vyKyF7LcHASm-e-7H_Qtdd1fruBlY0Wsz9X1eZ6uiSO7MlCxNn9m885yMsn6WUrH3pJkFWjIVAJzz47SUnuEcs16C76xItVK23bxMJvxgggmPxeLJCUbyw85AQpFSk2StF7ihyTusbYcvvKjvwlwnUpCUHVn97ncun6A34mDfv_vSr3-xh5RkfONO4kSgzW5PknW0egOpNhd3NU0O-Ulk9nrt9b4dZAbL7z1y63VkZz5f0MuEo3P_6jRyOEu3Mqpak2xDieTg6-4CyzP2-qPZvEHcdRuMr4IDnjPk8zUPeTPyoWrHCmmb4KU7eDbZ-BAI1KEsnmSysmqNUC_UvE5a3trv5oDYmCIqXXd5w3oYV-QQ%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT02QUYS9FDuZgJH4xopJvorPhi9AmnyHdT5YwPAKOZTPu41v_gpajsSfwlY5rOeZFqyOniPlQYD3bVYZY0KyuDQUqYiJwxfRs6RlGCDaORbESyOWjJB2PDN47lTsPh7jRfR7G85Jopf58XgPmMRUPYSTqytUjjC4eZGTlHJaWdzvV6NIH1GwDm-fzT5HWNnVvySIApVZtzSB5arIdYxQYjvlvIS4ljGrWuPs-_5hunTvhMoqGEVaMzM7YmtQIS3jytDkMKTqU1p6iKehd_k_dxS8vwBNEmvbSllf157HJktTfUzyg_LQSrKqxJxAIOXIhN5KAoAIjTF9Z5rqEENDbjzg159-K2OZjunVVcLxlpCpTPUDB6ZuZCmSHCaJ-DBx4gJjvJ4AqrODhB9eVYzkIqMB2QJv-kFhQauQDncOBlJsRQ3t72-TX4Rw%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT02QUYS9FDuZgJH4xopJvorPhi9AmnyHdT5YwPAKOZTPt2_lrYZdkN8E1wzHFnIAMlf568gt_I-8cFwdnR3z6M4zPxEd4GuJwqaCNbJwUGX0FWId-fJwUT5EfKxdqJahGyEgUgVJ7wLl-jXwQlyZWyiIGo6GLDPO_aAhVeDFPEEMpGNE3RQaOMRKors9Bqo7py-OZS-dmXN8J_Se9yyNnw0ofLdPfH0nJyBfuNbtDKYgbLjbQYD8WMMG427JlaeYNf_yN6PUro91hSOD6APDN89EewHfPPesY24IN72NScH1NycN-2-_3nKlN-lrcrwlYNVaog8YAjQ3lK3F8yup1PF5XUss3wZeCoBvxKPLLRsfqtLJ9jK9KJhirX8_87xgwjsGtDge3fZCOeHXwttyFEDUVnIa5pQpzGwMmqQ778pI13_iFUPoKK5g%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT02QUYS9FDuZgJH4xopJvorPhi9AmnyHdT5YwPAKOZTPuXRw5MN5k0UkeuYtN5mR0rPuvahJM0_C-7ytlW543eSlDrZjG5VP_XA2pvXkrVZ765K8d_KBF9i5hLmdknVCmdC8eidiwAgt2YmoFiSDvh4Tc3yUkJ3ZwArAS9Ho2o91nTSqW7rEsPeFJrAydBdyRlkYN725RrYhWLbSJe_EOGVhwCeIjd_AhbYG3laUW1uQjgqFnIpG49i6QHpMsXZ-pRGi84toe972sckTVX5Mog3snJFAw3PFgMS2gqNrgy8lyXqba0ZhWGGfo_ldNxjHgk2z7qRKyre63obTreswZaJ1KzFhr5c9yp6cVp7E25q-9xoFXsIT_g9tDxDqD4qe7vdx-GyU50RqXa2XNT80WYaxM0QP-fpjSRm7tbXIFM0NcPH-B5cf-7wQ%3D%3D&p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT02QUYS9FDuZgJH4xopJvorPhi9AmnyHdT5YwPAKOZTPvAlDNkriUMt3duQQyH40Pe583sdKW-YB6x1unI_7cUHKltlwr5R43S8hvKkj673I-aRSF-tOwTHvzkHUeFavXfM3z_eLaBOK_53nnap7027B22AzwMv14KVPO5JPcjHjnjEtNZpNulKQoSxvjjJEmjTuG0nTRjkqxEFDAwQiPFfF5j7W36oUNpzCKunbqtetqi9BPW6rLkmqMO4wjZ7dCVveb3UJWUyA8PqGx7y0EOHE73_ALi4VhlZPcHSZiTEOiKQmesN8KNzgxuoINjUKGwijOFtktlPCaD1rsxUcATcIU6N4YWCYjY9xCF3vmZ8-elER5mq1Xu3ZkRlWm3ybgXatR4QC87GjbEjj3-KzJh2XMS0-V53ja3Ns6HiPildepoCXneYpNhuA%3D%3D'

if (isGetCookie = typeof $request !==`undefined`) {
   GetCookie();
   $.done()
} 
if (!$.isNode() && !lookbodys) {
    $.msg($.name, "您未获取看看赚请求，请先获取");
} else if (!$.isNode() && !startbodys) {
    $.msg($.name, "您未获取浏览赚请求，请先获取");
}
if (!$.isNode() && !startbodys.indexOf("&") == -1) {
    startArr.push(startbodys)
} else if (!$.isNode() && !lookbodys.indexOf("&") == -1) {
    lookArr.push(lookbodys)
} else {
    if (!$.isNode() && !startbodys.indexOf("&") > -1) {
        StartBody = startbodys.split('&');
    }
    if (!$.isNode() && !lookbodys.indexOf("&") > -1) {
        LookBody = lookbodys.split('&');
    }
    if ($.isNode()) {
        if (process.env.YOUTH_START && process.env.YOUTH_START.indexOf('&') > -1) {
            StartBody = process.env.YOUTH_START.split('&');
        } else {
            StartBody = [process.env.YOUTH_START]
        };
        if (process.env.YOUTH_LOOK && process.env.YOUTH_LOOK.indexOf('&') > -1) {
            LookBody = process.env.YOUTH_LOOK.split('&');
        } else {
            LookBody = [process.env.YOUTH_LOOK]
        }
    }
    Object.keys(StartBody).forEach((item) => {
        if (StartBody[item]) {
            startArr.push(StartBody[item])
        }
    });
    Object.keys(LookBody).forEach((item) => {
        if (LookBody[item]) {
            lookArr.push(LookBody[item])
        }
    })
}
timeZone = new Date().getTimezoneOffset() / 60;
timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
});
console.log(`\n === 脚本执行 ${bjTime} ===\n`);
!(async() => {
    $.log(`您共提供${startArr.length}次浏览赚任务`)
    if (startArr.length !== 0) {
        for (let i = 0; i < startArr.length; i++) {
            if (startArr[i]) {
                gainbody = startArr[i];
                $.index = i + 1;
                $.log(`-------------------------\n\n开始中青看点浏览赚第${$.index}次任务`)
            }
            await GainStart();
        }
        console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${gainscore}个青豆，浏览赚任务全部结束`);
        //$.msg("中青看点浏览赚", `共完成${$.index}次任务`+`  共计获得${gainscore}个青豆`);
    }
    $.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n您共提供${lookArr.length}次看看赚任务\n`)
    if (lookArr.length !== 0) {
        for (let k = 0; k < lookArr.length; k++) {
            if (lookArr[k]) {
                lookbody = lookArr[k];
                $.index = k + 1;
                $.log(`-------------------------\n\n开始中青看点看看赚第${$.index}次任务`)
            }
            await lookStart();
        }
        console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${lookscore}个青豆，看看赚任务全部结束`);
        $.msg("中青看点看看赚", '共完成' + (lookArr.length + startArr.length) + '次任务，共计获得' + parseInt(lookscore + gainscore) + '个青豆');
    }
    if ($.isNode()) {
        //await notify.sendNotify($.name，`共完成${$.index}次任务，\n共计获得${gainscore}个青豆`
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function GainStart() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('task/browse_start.json', gainbody), async(error, resp, data) => {
            let startres = JSON.parse(data);
            if (startres.success == false) {
                smbody = $.getdata('youth_start').replace(gainbody + "&", "");
                $.setdata(smbody, 'youth_start');
                $.log(startres.message + "已自动删除")
            } else {
                comstate = startres.items.comtele_state;
                if (comstate == 0) {
                    $.log("任务开始，" + startres.items.banner_id + startres.message);
                    await $.wait(10000);
                    await GainEnd()
                } else if (comstate == 1) {
                    $.log("任务:" + startres.items.banner_id + "已完成，本次跳过");
                }
            }
            resolve()
        })
    })
}

function lookStart() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('Nameless/adlickstart.json', lookbody), async(error, resp, data) => {
            startlk = JSON.parse(data);
            if (startlk.success == false) {
                smbody = $.getdata('youth_look').replace(lookbody + "&", "");
                $.setdata(smbody, 'youth_look');
                $.log(startlk.message + "已自动删除")
            } else {
                comstate = startlk.items.comtele_state;
                if (comstate == 0) {
                    $.log("任务开始，" + startlk.items.banner_id + startlk.message);
                    for (let j = 0; j < startlk.items.see_num - startlk.items.read_num; j++) {
                        $.log("任务执行第" + parseInt(j + 1) + "次")
                        await $.wait(8000);
                        await lookstatus()
                    }
                    await $.wait(10000);
                    await lookEnd()
                } else if (comstate == 1) {
                    $.log("任务:" + startlk.items.banner_id + "已完成，本次跳过");
                }
            }
            resolve()
        })
    })
}

function GainEnd() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('task/browse_end.json', gainbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message + "，恭喜获得" + endres.items.score + "个青豆");
                gainscore += parseInt(endres.items.score)
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function lookstatus() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('Nameless/bannerstatus.json', lookbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message);
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function lookEnd() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('Nameless/adlickend.json', lookbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message + "，" + endres.items.desc)
                lookscore += parseInt(endres.items.score)
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function gainHost(api, body) {
    return {
        url: 'https://ios.baertt.com/v5/' + api,
        headers: {
            'User-Agent': 'KDApp/1.7.8 (iPhone; iOS 14.0; Scale/3.00)',
            'Host': 'ios.baertt.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
}


function GetCookie() {
    if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/browse_start\.json/)) {
        startbodyVal = $request.body;
        if (startbodys) {
            if (startbodys.indexOf(startbodyVal) > -1) {
                $.msg($.name, '阅读请求重复，本次跳过');
                return
            } else if (startbodys.indexOf(startbodyVal) == -1) {
                startbodys += "&" + startbodyVal
            }
        } else {
            startbodys = $request.body
        }
        $.setdata(startbodys, 'youth_start');
        $.log("获取浏览赚请求: " + startbodyVal);
        $.msg($.name, '获取浏览赚请求成功')
    } else if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/adlickstart\.json/)) {
        seeVal = $request.body;
        if (lookbodys) {
            if (lookbodys.indexOf(seeVal) > -1) {
                $.msg($.name, '阅读请求重复，本次跳过');
                return
            } else if (lookbodys.indexOf(seeVal) == -1) {
                lookbodys += "&" + seeVal
                $.msg($.name, '获取看看赚请求' + lookbodys.split("&").length + '成功')
            }
        } else {
            lookbodys = $request.body
            $.msg($.name, '获取看看赚请求成功')
        }
        $.setdata(lookbodys, 'youth_look');
        $.log("获取浏览赚请求: " + seeVal)
    }
}

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
