package app.address.dao;

import adi.jpa.crud.dao.BaseDao;
import adi.jpa.crud.exception.BaseDaoException;
import app.address.model.Address;
import app.person.dao.PersonDao;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@ApplicationScoped
public class AddressDao extends BaseDao<Address> {
    @Override
    public Class<Address> getClazz() {
        return Address.class;
    }

    @Transactional
    public void deleteAll(){
        getEntityManager().createQuery("DELETE FROM Address").executeUpdate();
    }
}

