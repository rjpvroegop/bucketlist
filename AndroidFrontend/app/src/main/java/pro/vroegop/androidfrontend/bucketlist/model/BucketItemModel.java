package pro.vroegop.androidfrontend.bucketlist.model;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by rjpvr_2lqg3gm on 3/29/2017.
 */

@Getter
@Setter
public class BucketItemModel implements Serializable {
    private String id;
    private String title;
    private String description;
    private String image;
    private boolean completed;
    private String info;
}
