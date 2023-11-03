package app.product.types.charger.dao;

import adi.jpa.crud.dao.BaseDao;
import app.product.types.charger.model.Charger;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ChargerDao extends BaseDao<Charger> {
    @Override
    public Class<Charger> getClazz() {
        return Charger.class;
    }
}
