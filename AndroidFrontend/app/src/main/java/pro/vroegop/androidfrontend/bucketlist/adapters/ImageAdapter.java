package pro.vroegop.androidfrontend.bucketlist.adapters;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.ListAdapter;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

import pro.vroegop.androidfrontend.bucketlist.listview.ListviewActivity;
import pro.vroegop.androidfrontend.bucketlist.model.BucketItemModel;

/**
 * Created by rjpvr_2lqg3gm on 3/29/2017.
 */

public class ImageAdapter extends BaseAdapter {
    List<BucketItemModel> bucketItems;
    Context mContext;

    public ImageAdapter(ListviewActivity listviewActivity, List<BucketItemModel> bucketItems) {
        this.bucketItems = bucketItems;
        mContext = listviewActivity;
    }

    @Override
    public int getCount() {
        return bucketItems.size();
    }

    @Override
    public BucketItemModel getItem(int position) {
        return bucketItems.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ImageView imageView;
        if (convertView == null) {
            // if it's not recycled, initialize some attributes
            imageView = new ImageView(mContext);
            imageView.setScaleType(ImageView.ScaleType.FIT_CENTER);
            imageView.setPadding(8, 8, 8, 8);
        } else {
            imageView = (ImageView) convertView;
        }

        String base64Image = getItem(position).getImage();
        base64Image = base64Image.substring(base64Image.indexOf(",") + 1);
        byte[] decodedString = Base64.decode(base64Image, Base64.DEFAULT);
        Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

        imageView.setImageBitmap(decodedByte);
        return imageView;
    }
}
