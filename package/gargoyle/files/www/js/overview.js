/*
 * This program is copyright � 2008-2011 Eric Bishop and is distributed under the terms of the GNU GPL 
 * version 2.0 with a special clarification/exception that permits adapting the program to 
 * configure proprietary "back end" software provided that all modifications to the web interface
 * itself remain covered by the GPL. 
 * See http://gargoyle-router.com/faq.html#qfoss for more information
 */function resetData(){var e=uptime.split(/[\t ]+/)[0],t=Math.floor(e/86400);e-=t*60*60*24;var n=Math.floor(e/3600);e-=n*60*60;var r=Math.floor(e/60),i=Math.floor((totalMemory-freeMemory)*100*10/totalMemory)/10,s=Math.floor(totalMemory*10/1024)/10,o=Math.floor((totalMemory-freeMemory)*10/1024)/10,u=Math.floor((totalSwap-freeSwap)*100*10/totalSwap)/10,a=Math.floor(totalSwap*10/1024)/10,f=Math.floor((totalSwap-freeSwap)*10/1024)/10;wirelessModes=[],wirelessModes.ap="Access Point (AP)",wirelessModes.sta="Client",wirelessModes["ap+sta"]="AP+Client",wirelessModes["ap+wds"]="AP+WDS",wirelessModes.adhoc="Ad Hoc",wirelessModes.disabled="Disabled";var l=getWirelessMode(uciOriginal),c=wirelessModes[l];qosUploadStatus=qosEnabled&&uciOriginal.get("qos_gargoyle","upload","total_bandwidth")!=""?"Enabled":"Disabled",qosDownloadStatus=qosEnabled&&uciOriginal.get("qos_gargoyle","download","total_bandwidth")!=""?"Enabled":"Disabled";var h=uciOriginal.getAllSectionsOfType("system","system");setChildText("device_model",model),setChildText("device_name",uciOriginal.get("system",h[0],"hostname")),setChildText("gargoyle_version",gargoyleVersion),setChildText("memory",""+o+"MB / "+s+"MB ("+i+"%)"),a>0?(document.getElementById("swap_container").style.display="block",setChildText("swap",""+f+"MB / "+a+"MB ("+u+"%)")):document.getElementById("swap_container").style.display="none",setChildText("load_avg",loadAvg),setChildText("connections",curConn+"/"+maxConn),setChildText("uptime",t+" days, "+n+" hours, "+r+" minutes"),setChildText("current_time",currentTime);var p=getBridgeSection(uciOriginal);setChildText("device_config",p==""?"Gateway":"Wireless Bridge/Repeater");if(p==""){document.getElementById("bridge_container").style.display="none",setChildText("lan_ip",currentLanIp),setChildText("lan_mask",currentLanMask),setChildText("lan_mac",currentLanMac),uciOriginal.get("network","wan","")==""&&(document.getElementById("wan_container").style.display="none"),setChildText("wan_ip",currentWanIp==""?"-":currentWanIp),setChildText("wan_mask",currentWanMask==""?"-":currentWanMask),setChildText("wan_mac",currentWanMac==""?"-":currentWanMac),setChildText("wan_gateway",currentWanGateway==""?"-":currentWanGateway);var d=wanDns.split(/[\t ]+/);d.length>0&&setChildText("wan_dns",d.shift()),wanDns==""&&setChildText("wan_dns","-");while(d.length>0){var v=document.createElement("br"),m=document.createElement("span"),g=document.createElement("span");m.className="leftcolumn",m.appendChild(document.createTextNode("invisible")),m.style.visibility="hidden",g.className="rightcolumn",g.appendChild(document.createTextNode(d.shift())),document.getElementById("wan_dns_container").appendChild(v),document.getElementById("wan_dns_container").appendChild(m),document.getElementById("wan_dns_container").appendChild(g)}uciOriginal.get("network","wan","proto")!="3g"&&(document.getElementById("wan_3g_container").style.display="none"),setChildText("wireless_mode",c);if(l!="disabled"){var y=uciOriginal.getAllSectionsOfType("wireless","wifi-iface"),b=[],w=null,E=!1,S;for(S=0;S<y.length;S++){var x=y[S],T=uciOriginal.get("wireless",x,"ssid"),N=uciOriginal.get("wireless",x,"mode");if(N=="ap"){var C=uciOriginal.get("wireless",x,"device"),k="G";C!=""&&uciOriginal.get("wireless",C,"hwmode")=="11na"&&(k="A"),b[k]=T}else otherIsSsid=N=="sta",w=T}b["G"]==null&&b["A"]==null?(document.getElementById("wireless_apssid_div").style.display="none",document.getElementById("wireless_apssid_5ghz_div").style.display="none"):b["G"]!=null&&b["A"]!=null?(document.getElementById("wireless_apssid_div").style.display="block",document.getElementById("wireless_apssid_5ghz_div").style.display="block",setChildText("wireless_apssid_label","2.4 GHz Access Point SSID:"),setChildText("wireless_apssid",b.G),setChildText("wireless_apssid_5ghz",b.A)):(document.getElementById("wireless_apssid_div").style.display="block",document.getElementById("wireless_apssid_5ghz_div").style.display="none",setChildText("wireless_apssid_label","Access Point SSID:"),setChildText("wireless_apssid",b["G"]==null?b.A:b.G)),w==null?document.getElementById("wireless_otherssid_div").style.display="none":(setChildText("wireless_otherssid",w),setChildText("wireless_otherssid_label",E?"SSID:":"SSID Joined by Client:"),currentWirelessMacs.length>0&&E&&setChildText("wan_mac",currentWirelessMacs[0])),setChildText("wireless_mac",currentWirelessMacs.length>0?currentWirelessMacs[0]:"")}else document.getElementById("wireless_mac_div").style.display="none",document.getElementById("wireless_apssid_div").style.display="none",document.getElementById("wireless_apssid_5ghz_div").style.display="none",document.getElementById("wireless_otherssid_div").style.display="none"}else document.getElementById("wan_container").style.display="none",document.getElementById("lan_container").style.display="none",document.getElementById("wifi_container").style.display="none",setChildText("bridge_ip",currentLanIp),setChildText("bridge_mask",currentLanMask),setChildText("bridge_mac",currentLanMac),setChildText("bridge_gateway",uciOriginal.get("network","lan","gateway")),setChildText("bridge_mode",uciOriginal.get("wireless",p,"client_bridge")=="1"?"Client Bridge":"WDS"),setChildText("bridge_ssid",uciOriginal.get("wireless",p,"ssid"));setChildText("qos_upload",qosUploadStatus),setChildText("qos_download",qosDownloadStatus)}function getSsids(){};