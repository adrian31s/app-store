package app.person.dao;

import adi.jpa.crud.dao.BaseDao;

import app.person.model.Person;
import javax.enterprise.context.ApplicationScoped;
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
