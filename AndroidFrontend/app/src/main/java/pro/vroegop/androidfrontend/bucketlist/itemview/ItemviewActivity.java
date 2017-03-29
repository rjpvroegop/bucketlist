package pro.vroegop.androidfrontend.bucketlist.itemview;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.Image;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.util.Base64;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import pro.vroegop.androidfrontend.R;
import pro.vroegop.androidfrontend.bucketlist.model.BucketItemModel;

import static android.text.Html.fromHtml;

public class ItemviewActivity extends AppCompatActivity {

    BucketItemModel item;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_itemview);

        Intent intent = getIntent();
        item = (BucketItemModel) intent.getSerializableExtra("item");

        fillData();
    }

    public void fillData(){
        TextView title = (TextView) findViewById(R.id.item_title);
        TextView description = (TextView) findViewById(R.id.item_description);
        ImageView image = (ImageView) findViewById(R.id.item_image);
        CheckBox completed = (CheckBox) findViewById(R.id.item_completed);
        TextView info = (TextView) findViewById(R.id.item_info);

        title.setText(fromHtml(item.getTitle()));
        description.setText(fromHtml(item.getDescription()));
        image.setImageBitmap(getImage());
        completed.setChecked(item.isCompleted());
        info.setText(fromHtml(item.getInfo()));
    }

    public Bitmap getImage(){
        String base64Image = item.getImage();
        base64Image = base64Image.substring(base64Image.indexOf(",") + 1);
        byte[] decodedString = Base64.decode(base64Image, Base64.DEFAULT);
        Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
        return decodedByte;
    }
}
