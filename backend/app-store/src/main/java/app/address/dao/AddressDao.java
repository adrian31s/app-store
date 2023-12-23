package app.address.dao;

import adi.jpa.crud.dao.BaseDao;
import app.address.model.Address;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
public class AddressDao extends BaseDao<Address> {
    @Override
    public Class<Address> getClazz() {
        return Address.class;
    }

    @Transactional
    public void deleteAll() {
        getEntityManager().createQuery("DELETE FROM Address").executeUpdate();
    }
}

