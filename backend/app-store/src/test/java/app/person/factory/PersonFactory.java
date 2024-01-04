package app.person.factory;

import app.person.model.Person;

import java.util.UUID;

public class PersonFactory {
    public static Person createRandomPerson(){
        Person person = new Person();
        person.setUsername("username" + UUID.randomUUID());
        person.setEmail("email" + UUID.randomUUID());
        return person;
    }
}
