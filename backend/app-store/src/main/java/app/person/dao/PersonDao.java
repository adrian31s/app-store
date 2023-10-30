package app.person.dao;

import adi.jpa.crud.dao.BaseDao;
import adi.jpa.crud.exception.BaseDaoException;
import adi.jpa.crud.model.BaseEntity;
import app.address.model.Address;
import app.address.service.AddressService;
import app.person.model.Person;
import io.quarkus.narayana.jta.QuarkusTransaction;
import org.hibernate.Session;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.TransactionManager;
import javax.transaction.Transactional;

@ApplicationScoped
public class PersonDao extends BaseDao<Person> {

    @Override
    public Class<Person> getClazz() {
        return Person.class;
    }

    @Transactional
    public void deleteAll() {
        getEntityManager().createQuery("DELETE FROM Person").executeUpdate();
    }
}
