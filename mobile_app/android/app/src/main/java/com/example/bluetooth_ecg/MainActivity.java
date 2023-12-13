package com.example.bluetooth_ecg;

import io.flutter.embedding.android.FlutterActivity;

import android.content.ContextWrapper;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;


import androidx.annotation.NonNull;

import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;


import com.chaquo.python.PyObject;
import com.chaquo.python.Python;
import com.chaquo.python.android.AndroidPlatform;

import java.util.HashMap;
import java.util.Set;
public class MainActivity extends FlutterActivity {
    private static final String CHANNEL = "com.example.method_channel/java";

    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL).
                setMethodCallHandler(
                        (call, result) -> {
                            // if (call.method.equals("getBatteryLevel")) {
                            //     int batteryLevel = getBatteryLevel();

                            //     if (batteryLevel != -1) {
                            //         result.success(batteryLevel);
                            //     } else {
                            //         result.error("UNAVAILABLE", "Battery level not available.", null);
                            //     }
                            // } else {
                            //     result.notImplemented();
                            // }
                            if (call.method.equals("helloWorldPython")) {
                                result.success(helloWorldPython());
                            }
                        });
    }



    private int getBatteryLevel() {
        int batteryLevel = -1;
        if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
            BatteryManager batteryManager = (BatteryManager) getSystemService(BATTERY_SERVICE);
            batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
        }else {
            Intent intent = new ContextWrapper(getApplicationContext()).
                    registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
            batteryLevel = (intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) * 100) /
                    intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        }


        return batteryLevel;
    }

    private HashMap<String, String> helloWorldPython() {
        if (!Python.isStarted()) {
            Python.start(new AndroidPlatform(this));
        }

        Python py = Python.getInstance();
        // get file python (PyObject)
        PyObject module = py.getModule("native");
        PyObject data = module.callAttr("helloWorld");
       // System.out.println("Hello " + data);
        

        HashMap<String,String> map = new HashMap<>();
        //System.out.println(data.asMap().get("sbp").toString());

        Set<PyObject> pyKeySet = data.callAttr("keys").asSet();

        for ( PyObject pyKey:pyKeySet) {
            String key = pyKey.toString();
            map.put(key, data.callAttr("get",key).toString());
           
        }
        // map.put("sbp", data.asMap().get("sbp").toDouble());
        // map.put("dbp", data.asMap().get("dbp").toDouble());
        // map.put("heart_rate", data.asMap().get("heart_rate").toDouble());
        // map.put("standard_deviation", data.asMap().get("standard_deviation").toDouble());
        
        return map;
    }
}
