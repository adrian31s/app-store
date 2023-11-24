package app.person.dao;

import adi.jpa.crud.dao.BaseDao;
import app.person.model.Person;
import app.person.model.Person_;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;


@ApplicationScoped
public class PersonDao extends BaseDao<Person> {

    @Transactional(Transactional.TxType.SUPPORTS)
    public Person findByUsernameAndPerson(String username, String password){
        CriteriaBuilder cb = this.getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Person> cq = cb.createQuery(Person.class);
        Root<Person> root = cq.from(Person.class);
        cq.where(cb.and(cb.equal(root.get(Person_.USERNAME), username),cb.equal(root.get(Person_.PASSWORD),password)));

        return this.getEntityManager().createQuery(cq).getSingleResult();
    }


    @Override
    public Class<Person> getClazz() {
        return Person.class;
    }

    @Transactional
    public void deleteAll() {
        getEntityManager().createQuery("DELETE FROM Person").executeUpdate();
    }
}
