package com.example.bluetooth_ecg;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.BatteryManager;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.Toast;


import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Set;

import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;

public class MainActivity extends FlutterActivity {
    private static final String CHANNEL = "fmecg/java";
    private static final int REQUEST_ENABLE_BT = 1;
    BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
   ArrayList<String> devicesPairedName ;
    ArrayList<String> devicesFoundName;

    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL).
                setMethodCallHandler(

                        (call, result) -> {
                            if (call.method.equals("enableBluetooth")) {
                                boolean status = enableBluetooth();

                                result.success(status);
                            } if (call.method.equals("getPairedDevices")) {
                                result.success(getPairedDevices());
                            } if (call.method.equals("getFoundDevices")) {
                                result.success(getFoundDevices());
                            }
                        });
    }




    private boolean enableBluetooth() {
        //bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

        // check bluetooth enable
        if (bluetoothAdapter == null) {

            return false;
        } else {
            //enable bluetooth
            if (!bluetoothAdapter.isEnabled()) {
                Intent enableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(this, "Bluetooth disabled", Toast.LENGTH_SHORT);
                }
                startActivityForResult(enableIntent, REQUEST_ENABLE_BT);

            }
            return bluetoothAdapter.isEnabled();
        }

    }

    private ArrayList<String> getPairedDevices() {

        devicesPairedName = new ArrayList<>();
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(this, "Bluetooth disabled", Toast.LENGTH_SHORT);
        }
        Set<BluetoothDevice> pairedDevices = bluetoothAdapter.getBondedDevices();
        for (BluetoothDevice device : pairedDevices) {
            devicesPairedName.add(device.getName());
        }
        return devicesPairedName;
    }
    private ArrayList<String> getFoundDevices() {
        devicesFoundName = new ArrayList<>();
        IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
        registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                if (BluetoothDevice.ACTION_FOUND.equals(action)) {
                    // Discovery has found a device. Get the BluetoothDevice
                    // object and its info from the Intent.
                    BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                    if (ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                        shouldShowRequestPermissionRationale(Manifest.permission.BLUETOOTH_CONNECT);
                        ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.BLUETOOTH_CONNECT}, REQUEST_ENABLE_BT);
                    }
                    String deviceName = device.getName();
                    String deviceHardwareAddress = device.getAddress(); // MAC address
                    devicesFoundName.add(deviceName);
                }
            }
        },filter);
        return  devicesFoundName;
    }
}
