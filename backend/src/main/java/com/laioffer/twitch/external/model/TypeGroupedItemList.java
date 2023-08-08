package com.laioffer.twitch.external.model;

import com.laioffer.twitch.db.entity.ItemEntity;

import java.util.List;

public record TypeGroupedItemList(
        List<ItemEntity> streams,
        List<ItemEntity> videos,
        List<ItemEntity> clips
) {

    public TypeGroupedItemList(List<ItemEntity> items){
        this(
                filterForType(items, ItemType.STREAM),
                filterForType(items, ItemType.VIDEO),
                filterForType(items, ItemType.CLIP)
        );
    }

    public TypeGroupedItemList(String gameId, List<Stream> streams, List<Video> videos, List<Clip> clips){
        this(
                fromStreams(streams),
                fromVideos(gameId, videos),
                fromClips(clips)
        );
    }

    private static List<ItemEntity> filterForType(List<ItemEntity> items, ItemType type){
        return items.stream().filter(item -> item.type() == type).toList();
    }

    private static List<ItemEntity> fromStreams(List<Stream> streams){
        return streams.stream().map(ItemEntity::new).toList();
    }

    private static List<ItemEntity> fromVideos(String gameId, List<Video> videos){
        return videos.stream().map(video -> new ItemEntity(gameId, video)).toList();
    }

    private static  List<ItemEntity> fromClips(List<Clip> clips){
        return clips.stream().map(clip -> new ItemEntity(clip)).toList();
    }
}
