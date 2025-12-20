package com.aktech.uniclove.modules.sharedpref

import android.content.Context
import com.facebook.react.bridge.*
import com.aktech.uniclove.SharedPref

class SharedPrefModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val sharedPref = SharedPref.getPrefsInstance()

    override fun getName(): String {
        return "SharedPrefModule"
    }

    @ReactMethod
    fun getSelectedLanguageCode(promise: Promise) {
        try {
            val lang = sharedPref.getSelectedLanguageCode()
            promise.resolve(lang)
        } catch (e: Exception) {
            promise.reject("ERR", e.message, e)
        }
    }

    @ReactMethod
    fun setSelectedLanguageCode(languageCode: String, promise: Promise) {
        try {
            sharedPref.setSelectedLanguageCode(languageCode)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERR", e.message, e)
        }
    }
}