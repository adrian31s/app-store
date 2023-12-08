package app.person.factory;

import app.person.model.Person;

import java.util.Random;

public class PersonFactory {
    private static final Random random = new Random();

    public static Person createRandomPerson(){
        Person person = new Person();
        person.setUsername("username" + random.nextInt());
        person.setEmail("email" + random.nextInt());
        return person;
    }
}
