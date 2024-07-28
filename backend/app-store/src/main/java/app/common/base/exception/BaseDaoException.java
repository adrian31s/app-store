//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package app.common.base.exception;

import app.common.base.dao.BaseDao;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;

@Getter
public class BaseDaoException extends RuntimeException {
    private static final Logger log = LoggerFactory.getLogger(BaseDaoException.class);
    private final String params;
    private final String exceptionMessage;

    public BaseDaoException(BaseDao.BaseDaoExceptionMessage exceptionMessage, Throwable exception, Object... params) {
        super(exception);
        this.exceptionMessage = exceptionMessage.getMessage();
        this.params = String.join(", ", Arrays.toString(params));
        this.logException();
    }

    private void logException() {
        log.error("\n ******************\n ERROR -> {},\n MESSAGE -> {},\n PARAMS -> {} \n ******************", new Object[]{this.getCause().toString(), this.exceptionMessage, this.params});
    }

}
