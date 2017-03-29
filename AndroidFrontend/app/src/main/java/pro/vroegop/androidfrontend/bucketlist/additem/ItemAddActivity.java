package pro.vroegop.androidfrontend.bucketlist.additem;

import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Base64;
import android.util.Base64InputStream;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;

import pro.vroegop.androidfrontend.R;
import pro.vroegop.androidfrontend.bucketlist.model.BucketItemModel;
import pro.vroegop.androidfrontend.bucketlist.model.BucketlistItemConsumer;
import pro.vroegop.androidfrontend.bucketlist.service.BucketlistService;

public class ItemAddActivity extends AppCompatActivity implements BucketlistItemConsumer {

    private BucketItemModel bucketItem = new BucketItemModel();
    private static final int RESULT_LOAD_IMG = 1;
    private EditText title;
    private EditText description;
    private ImageView image;
    private CheckBox completed;
    private EditText info;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item_add);

        init();
    }

    public void checkCompleted(View view){
        if(completed.isChecked()){
            info.setVisibility(View.VISIBLE);
        } else {
            info.setVisibility(View.INVISIBLE);
        }
    }

    public void openGallery(View view){
        // Create intent to Open Image applications like Gallery, Google Photos
        Intent galleryIntent = new Intent(Intent.ACTION_PICK,
                android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        // Start the Intent
        startActivityForResult(galleryIntent, RESULT_LOAD_IMG);
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        try {
            // When an Image is picked
            if (requestCode == RESULT_LOAD_IMG && resultCode == RESULT_OK
                    && null != data) {

                Uri uri = data.getData();
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), uri);

                ByteArrayOutputStream byteArrayOS = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.JPEG, 20, byteArrayOS);
                bucketItem.setImage(Base64.encodeToString(byteArrayOS.toByteArray(), Base64.DEFAULT));

                image.setImageBitmap(bitmap);
            } else {
                Snackbar.make(this.findViewById(R.id.scrollView), "You haven't picked any Image",
                        Snackbar.LENGTH_LONG).show();
            }
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG)
                    .show();
        }

    }

    public void saveItem(View view) {
//        findViewById(R.id.save_item).setVisibility(View.INVISIBLE);

        bucketItem.setTitle(title.getText().toString());
        bucketItem.setDescription(description.getText().toString());
        bucketItem.setCompleted(completed.isChecked());
        bucketItem.setInfo(info.getText().toString());

        RequestQueue queue = Volley.newRequestQueue(this);
        queue.add(BucketlistService.postBucketlistItem(bucketItem, this));
    }

    public void init(){
        title = (EditText) findViewById(R.id.edit_title);
        description = (EditText) findViewById(R.id.edit_description);
        image = (ImageView) findViewById(R.id.image_preview);
        completed = (CheckBox) findViewById(R.id.edit_completed);
        info = (EditText) findViewById(R.id.edit_info);
    }

    @Override
    public void receiveItem(BucketItemModel bucketItem) {
        super.onBackPressed();
    }
}
