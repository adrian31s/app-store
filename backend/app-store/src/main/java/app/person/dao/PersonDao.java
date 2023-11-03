package app.person.dao;

import adi.jpa.crud.dao.BaseDao;

import app.bucket.model.Bucket;
import app.bucket.model.Bucket_;
import app.person.model.Person;

import javax.enterprise.context.ApplicationScoped;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
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
