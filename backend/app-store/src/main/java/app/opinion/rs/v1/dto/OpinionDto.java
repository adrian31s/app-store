package app.opinion.rs.v1.dto;

public record OpinionDto(
        String comment,
        Float rate,
        String username,
        Long productId,
        Long bid
) {
}
