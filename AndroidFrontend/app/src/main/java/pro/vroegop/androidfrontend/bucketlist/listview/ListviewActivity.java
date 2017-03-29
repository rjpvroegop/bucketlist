package pro.vroegop.androidfrontend.bucketlist.listview;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.GridView;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

import java.util.List;

import pro.vroegop.androidfrontend.R;
import pro.vroegop.androidfrontend.bucketlist.adapters.ImageAdapter;
import pro.vroegop.androidfrontend.bucketlist.itemview.ItemviewActivity;
import pro.vroegop.androidfrontend.bucketlist.model.BucketItemModel;
import pro.vroegop.androidfrontend.bucketlist.model.BucketlistConsumer;
import pro.vroegop.androidfrontend.bucketlist.service.BucketlistService;

public class ListviewActivity extends AppCompatActivity implements BucketlistConsumer {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);

        getBucketlist();
    }

    public void getBucketlist() {
        // Instantiate the RequestQueue.
        RequestQueue queue = Volley.newRequestQueue(this);

        // Add the request to the RequestQueue.
        queue.add(BucketlistService.getBucketlist(this));
    }

    @Override
    public void receiveList(List<BucketItemModel> bucketItems) {
        System.out.println(bucketItems.get(0).getTitle());

        addToGrid(bucketItems);
    }

    public void addToGrid(final List<BucketItemModel> bucketItems){
        GridView gridview = (GridView) findViewById(R.id.gridview);
        gridview.setAdapter(new ImageAdapter(this, bucketItems));

        gridview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View v,
                                    int position, long id) {
                BucketItemModel item = (BucketItemModel) parent.getItemAtPosition(position);

                Intent intent = new Intent(ListviewActivity.this, ItemviewActivity.class);
                intent.putExtra("item", item);
                startActivity(intent);
            }
        });
    }
}
