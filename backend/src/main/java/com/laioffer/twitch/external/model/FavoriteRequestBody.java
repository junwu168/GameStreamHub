package com.laioffer.twitch.external.model;

import com.laioffer.twitch.db.entity.ItemEntity;

public record FavoriteRequestBody(
        ItemEntity favorite
) {
}
