package pro.vroegop.androidfrontend.bucketlist.service;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import pro.vroegop.androidfrontend.bucketlist.model.BucketItemModel;
import pro.vroegop.androidfrontend.bucketlist.model.BucketlistConsumer;
import pro.vroegop.androidfrontend.bucketlist.model.BucketlistItemConsumer;

/**
 * Created by rjpvr_2lqg3gm on 3/29/2017.
 */

public class BucketlistService {
    private static String baseUrl = "http://vroegop.pro/bucketlist/api/v1/bucketlist";

    public static StringRequest getBucketlist(final BucketlistConsumer serviceConsumer){
        // Request a string response from the provided URL.
        return new StringRequest(
                Request.Method.GET,
                baseUrl,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Gson gson = new Gson();
                        Type listType = new TypeToken<ArrayList<BucketItemModel>>() {
                        }.getType();
                        List<BucketItemModel> bucketItems = gson.fromJson(response, listType);
                        serviceConsumer.receiveList(bucketItems);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                }
        );
    }

    public static StringRequest getBucketlistItem(String id, final BucketlistItemConsumer serviceConsumer){
        // Request a string response from the provided URL.
        return new StringRequest(
                Request.Method.GET,
                baseUrl + "?id=" + id,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Gson gson = new Gson();
                        BucketItemModel bucketItem = gson.fromJson(response, BucketItemModel.class);
                        serviceConsumer.receiveItem(bucketItem);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                }
        );
    }

    public static JsonObjectRequest postBucketlistItem(final BucketItemModel item, final BucketlistItemConsumer serviceConsumer){
        JSONObject json = null;
        try {
            json = new JSONObject(new Gson().toJson(item));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest postRequest = new JsonObjectRequest(baseUrl, json,
                new Response.Listener<JSONObject>()
                {
                    @Override
                    public void onResponse(JSONObject response) {
                        System.out.println(response.toString());
                        serviceConsumer.receiveItem(item);
                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // error
                        error.printStackTrace();
                    }
                }
        );

        return postRequest;
    }
}
