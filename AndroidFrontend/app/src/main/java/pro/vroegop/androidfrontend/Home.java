package pro.vroegop.androidfrontend;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.ListViewCompat;
import android.view.View;

import pro.vroegop.androidfrontend.bucketlist.additem.ItemAddActivity;
import pro.vroegop.androidfrontend.bucketlist.listview.ListviewActivity;

public class Home extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
    }

    public void navigateToList(View view){
        Intent intent = new Intent(this, ListviewActivity.class);
        startActivity(intent);
    }

    public void addItem(View view){
        Intent intent = new Intent(this, ItemAddActivity.class);
        startActivity(intent);
    }
}
