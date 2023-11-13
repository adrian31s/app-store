package app.address.factory;

import app.address.model.Address;
import app.person.model.Person;
import app.person.service.PersonService;

import javax.inject.Inject;
import java.util.Random;
import java.util.Set;

public class AddressFactory {
    private static Random random = new Random();

    public static Address createRandomAddress(){
        Address address = new Address();
        address.setProvince("province" + random.nextInt());
        address.setZipCode("zipcode" + random.nextInt());
        address.setBuildingNumber("buildingNumber" + random.nextInt());
        address.setApartmentNumber(random.nextInt());
        address.setStreetName("streetName" + random.nextInt());
        return address;
    }

}
