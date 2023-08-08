package com.laioffer.twitch.external.model;

public record TwitchErrorResponse(
        String message,
        String error,
        String details
) {
}
