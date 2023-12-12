package app.product.types.charger.dao;

import adi.jpa.crud.dao.BaseDao;
import app.product.types.charger.model.Charger;
import app.product.types.charger.model.Charger_;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.util.HashMap;

@ApplicationScoped
public class ChargerDao extends BaseDao<Charger>  {

    @Transactional(Transactional.TxType.SUPPORTS)
    public Charger getChargerByProductId(Long productId){
        try{
            CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
            CriteriaQuery<Charger> cq = cb.createQuery(Charger.class);
            Root<Charger> root = cq.from(Charger.class);
            cq.where(cb.equal(root.get(Charger_.PRODUCT),productId));
            return getEntityManager().createQuery(cq).getSingleResult();
        } catch (NoResultException nre){
            return null;
        }
    }

    @Transactional
    public void deleteAll() {
        getEntityManager().createQuery("DELETE FROM Charger").executeUpdate();
    }

    @Override
    public Class<Charger> getClazz() {
        return Charger.class;
    }
}
