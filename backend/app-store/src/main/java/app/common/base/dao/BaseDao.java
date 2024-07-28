//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package app.common.base.dao;

import app.common.base.model.BaseEntity;
import app.common.base.exception.BaseDaoException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public abstract class BaseDao<T extends BaseEntity> {
    private static final Logger log = LoggerFactory.getLogger(BaseDao.class);
    @Inject
    EntityManager entityManager;

    public BaseDao() {
    }

    public abstract Class<T> getClazz();

    @Transactional(Transactional.TxType.SUPPORTS)
    public T getById(Long id) throws BaseDaoException {
        try {
            Class<T> clazz = this.getClazz();
            return this.entityManager.find(clazz, id);
        } catch (Exception var3) {
            throw new BaseDaoException(BaseDao.BaseDaoExceptionMessage.GET_ENTITY_BY_ID, var3, new Object[]{id});
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public T createEntity(T entity) throws BaseDaoException {
        try {
            this.entityManager.persist(entity);
            this.entityManager.flush();
            return entity;
        } catch (Exception var3) {
            throw new BaseDaoException(BaseDao.BaseDaoExceptionMessage.CREATE_ENTITY, var3, new Object[]{entity});
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public T updateEntity(T entity) throws BaseDaoException {
        try {
            if (this.getById(entity.getBid()) == null) {
                log.info(BaseDao.BaseDaoExceptionMessage.NO_RESULT.getMessage());
                return null;
            } else {
                this.entityManager.merge(entity);
                this.entityManager.flush();
                return entity;
            }
        } catch (Exception var3) {
            throw new BaseDaoException(BaseDao.BaseDaoExceptionMessage.UPDATE_ENTITY, var3, new Object[]{entity});
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public void deleteById(Long id) throws BaseDaoException {
        try {
            T t = this.getById(id);
            if (t == null) {
                log.info(BaseDao.BaseDaoExceptionMessage.NO_RESULT.getMessage());
            } else {
                this.entityManager.remove(t);
                this.entityManager.flush();
            }
        } catch (Exception var3) {
            throw new BaseDaoException(BaseDao.BaseDaoExceptionMessage.DELETE_ENTITY, var3, new Object[]{id});
        }
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<T> getAllEntities() throws BaseDaoException {
        try {
            Class<T> clazz = this.getClazz();
            CriteriaBuilder cb = this.entityManager.getCriteriaBuilder();
            CriteriaQuery<T> cq = cb.createQuery(clazz);
            Root<T> root = cq.from(clazz);
            cq.select(root);
            return this.entityManager.createQuery(cq).getResultList();
        } catch (Exception var5) {
            throw new BaseDaoException(BaseDao.BaseDaoExceptionMessage.GET_ALL_ENTITIES, var5, new Object[0]);
        }
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<T> getEntitiesByMultipleFields(Map<String, Object> values) throws BaseDaoException {
        try {
            Class<T> clazz = this.getClazz();
            CriteriaBuilder cb = this.entityManager.getCriteriaBuilder();
            CriteriaQuery<T> cq = cb.createQuery(clazz);
            Root<T> root = cq.from(clazz);
            List<Predicate> predicates = new ArrayList();
            Iterator var7 = values.keySet().iterator();

            while(var7.hasNext()) {
                String field = (String)var7.next();
                predicates.add(cb.equal(root.get(field), values.get(field)));
            }

            cq.where((Predicate[])predicates.toArray(new Predicate[0]));
            return this.entityManager.createQuery(cq).getResultList();
        } catch (Exception var9) {
            throw new BaseDaoException(BaseDao.BaseDaoExceptionMessage.GET_ENTITIES_BY_MULTIPLE_FIELDS, var9, new Object[]{values});
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public int updateEntitiesFieldsById(Long id, Map<String, Object> values) throws BaseDaoException {
        try {
            Class<T> clazz = this.getClazz();
            CriteriaBuilder cb = this.entityManager.getCriteriaBuilder();
            CriteriaUpdate<T> cu = cb.createCriteriaUpdate(clazz);
            Root<T> root = cu.from(clazz);
            Iterator var7 = values.keySet().iterator();

            while(var7.hasNext()) {
                String field = (String)var7.next();
                cu.set(root.get(field), values.get(field));
            }

            cu.where(cb.equal(root.get("bid"), id));
            return this.entityManager.createQuery(cu).executeUpdate();
        } catch (Exception var9) {
            throw new BaseDaoException(BaseDao.BaseDaoExceptionMessage.UPDATE_ENTITIES_MULTIPLE_FIELDS_BY_ID, var9, new Object[]{id, values});
        }
    }

    public EntityManager getEntityManager() {
        return this.entityManager;
    }

    public static enum BaseDaoExceptionMessage {
        GET_ENTITY_BY_ID("Exception during get entity by id"),
        GET_ALL_ENTITIES("Exception during get all entities"),
        GET_ENTITIES_BY_MULTIPLE_FIELDS("Exception during get entities by multiple fields"),
        UPDATE_ENTITIES_MULTIPLE_FIELDS_BY_ID("Exception during update entities multiple fields"),
        NO_RESULT("No entity found"),
        CREATE_ENTITY("Exception during create entity"),
        UPDATE_ENTITY("Exception during update entity"),
        DELETE_ENTITY("Exception during delete entity");

        private final String message;

        private BaseDaoExceptionMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return this.message;
        }
    }
}
