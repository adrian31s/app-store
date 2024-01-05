package app.address.dao;

import adi.jpa.crud.dao.BaseDao;
import app.address.model.Address;
import app.address.model.Address_;
import app.person.model.Person;
import app.person.model.Person_;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.util.List;


@ApplicationScoped
public class AddressDao extends BaseDao<Address> {

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Address> getAddressByPersonId(Long personId){
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Address> cq = cb.createQuery(Address.class);
        Root<Address> root = cq.from(Address.class);
        Join<Person,Address> personAddressJoin = root.join(Address_.PERSON_SET);

        cq.where(cb.equal(personAddressJoin.get(Person_.BID),personId));
        return getEntityManager().createQuery(cq).getResultList();
    }


    @Override
    public Class<Address> getClazz() {
        return Address.class;
    }

    @Transactional
    public void deleteAll() {
        getEntityManager().createQuery("DELETE FROM Address").executeUpdate();
    }
}

