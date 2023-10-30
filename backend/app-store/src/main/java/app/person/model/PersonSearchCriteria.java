package app.person.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class PersonSearchCriteria {
    private String username;
    private String name;
    private String lastName;
}
