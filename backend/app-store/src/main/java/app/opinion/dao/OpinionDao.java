package app.opinion.dao;

import adi.jpa.crud.dao.BaseDao;
import app.opinion.model.Opinion;
import app.opinion.model.Opinion_;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

@ApplicationScoped
public class OpinionDao extends BaseDao<Opinion> {

    @Transactional(Transactional.TxType.REQUIRED)
    public void deleteByUsernameAndId(String username, Long opinionId) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaDelete<Opinion> cd = cb.createCriteriaDelete(Opinion.class);
        Root<Opinion> root = cd.from(Opinion.class);

        cd.where(cb.and(
                        cb.equal(root.get(Opinion_.USERNAME), username)),
                cb.equal(root.get(Opinion_.BID), opinionId)
        );
        getEntityManager().createQuery(cd).executeUpdate();
    }

    @Override
    public Class<Opinion> getClazz() {
        return Opinion.class;
    }
}
