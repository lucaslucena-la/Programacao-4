

const meuCofre = (function(){
    let senha = '1234'; //senha privada do banco
    let saldo = 0; //saldo privado
    let tentativasFalhas = 0; //contador de tentativas falhas
    let bloqueado = false; //indica se o cofre está bloqueado

    //Funcionalidades:
    function verificarSenha(senhaFornecida){
        if(bloqueado){
            console.log("Cofre bloqueado. Tente novamente mais tarde.");
            return false;
        }
        if(senhaFornecida === senha){
            tentativasFalhas = 0; //reseta tentativas falhas
            return true
        }else{
            tentativasFalhas++;
            console.log("Senha incorreta. Tentativas falhas: " + tentativasFalhas);
            if(tentativasFalhas >= 3){
                bloqueado = true;
                console.log("Cofre bloqueado por segurança. Tente novamente mais tarde.");
            }
        }

    }

    function depositar(valor) { 
        if(bloqueado){
            return ("Cofre bloqueado. Tente novamente mais tarde.");
        }
        if(valor <= 0){
            return ("Valor de depósito inválido.");
        }else{
            saldo += valor;
            return ("Depósito de R$" + valor + " realizado com sucesso. Saldo atual: R$" + saldo);
        }
    }

    function sacar(senhaFornecida, valor) { 
        if(bloqueado){
            return ("Cofre bloqueado. Tente novamente mais tarde.");
        }
        if(!verificarSenha(senhaFornecida)){
            return ("Senha incorreta. Saque não autorizado.");
        }
        if(valor > saldo){
            return ("Saldo insuficiente para saque de R$" + valor + ". Saldo atual: R$" + saldo);
        }
        if(valor <= 0){
            return ("Valor de saque inválido.");
        }
        saldo -= valor;
        return ("Saque de R$" + valor + " realizado com sucesso. Saldo atual: R$" + saldo);
    }

    function consultarSaldo(senhaFornecida) { 
        if(bloqueado){
            return ("Cofre bloqueado. Tente novamente mais tarde.");
        }
        if(!verificarSenha(senhaFornecida)){
            return ("Senha incorreta. Consulta de saldo não autorizada.");
        }
        return ("Saldo atual: R$" + saldo);
    }

    function alterarSenha(senhaAntiga, senhaNova) { 
        if(bloqueado){
            return ("Cofre bloqueado. Tente novamente mais tarde.");
        }
        if(!verificarSenha(senhaAntiga)){
            return ("Senha antiga incorreta. Alteração de senha não autorizada.");
        }
        senha = senhaNova;
        return ("Senha alterada com sucesso.");
    }

    return {
        depositar,
        sacar,
        consultarSaldo,
        alterarSenha
    };

})();