package pro.vroegop.androidfrontend.bucketlist.model;

import java.util.List;

import pro.vroegop.androidfrontend.bucketlist.service.BucketlistService;

/**
 * Created by rjpvr_2lqg3gm on 3/29/2017.
 */

public interface BucketlistConsumer {
    void receiveList(List<BucketItemModel> bucketItems);
}
