package com.joaquin.Noteoa;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
//pliggin que se va a registrar
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
//import com.capaci --> storage

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle saveInstanceState){
        super.onCreate(saveInstanceState);

        //que los plugin no oficiales, si algún pluggin no lo reconoce se pone aqui
        registerPlugin(GoogleAuth.class);
        //registerPlugin(StoragePlugin.class);
    }
}
