package app.bucket.dao;

import app.base.BaseTest;
import app.bucket.model.Bucket;
import app.person.factory.PersonFactory;
import app.person.model.Person;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

@QuarkusTest
public class BucketDaoTest extends BaseTest {

    @BeforeEach
    public void cleanup(){
        super.cleanUp();
    }

    @Test
    public void shouldFindActiveBucketByPersonId(){
        //given
        Bucket bucket = new Bucket();
        Person person = personDao.createEntity(PersonFactory.createRandomPerson());
        bucket.setPerson(person);
        bucketDao.createEntity(bucket);

        //when
        Bucket activeBucket = bucketDao.getActiveBucketByPersonId(person.getBid());

        //then
        Assertions.assertEquals(activeBucket.getPerson().getBid(),person.getBid());
        Assertions.assertNull(bucket.getArchived());
    }

    @Test
    public void shouldNotFindActiveBucketByPersonId(){
        //given
        Bucket bucket = new Bucket();
        Person person = personDao.createEntity(PersonFactory.createRandomPerson());
        bucket.setPerson(person);
        bucket.setArchived(Boolean.TRUE);
        bucketDao.createEntity(bucket);

        //when
        Bucket activeBucket = bucketDao.getActiveBucketByPersonId(person.getBid());

        //then
        Assertions.assertNull(activeBucket);
    }

}
