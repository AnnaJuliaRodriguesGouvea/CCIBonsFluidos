const produtoDao = require("../DAO/produto-dao")
const ProductModel = require("../model/Produto")
const acessoService = require("../service/acesso-service")

module.exports = {
    getProductByCode: async function(codigo) {
        return await produtoDao.getByCodigo(codigo)
    },

    getProductByCode: async function(codigo) {
        return await produtoDao.getByCodigo(codigo)
    },

    existsCode: async function(codigo) {
        return await produtoDao.getByCodigo(codigo) != null
    },

    productsList: async function(limite, pagina) {
        const products = await produtoDao.listar(limite, pagina)
        if (products) {
            if(products.rows.length > 0)
                return {status: 200, data: products}
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    productsListWithStock: async function(substring) {
        const products = await produtoDao.listarComEstoque(substring)
        if (products) {
            if(products.length > 0)
                return {status: 200, data: products}
            return {status: 204, data: "Não possui dados suficientes"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    searchCode: async function(codigo) {
        const access = await acessoService.getAcessoByCodigo(codigo)
        const product = await this.getProductByCode(codigo)
        if (access && product) {
            return {status: 200, data: {access: access, product: product}}
        }
        return {status: 404, data: "Não existe um produto com esse código"}
    },

    createProduct: async function(marca, nome, temAbas, quantidadeNoPacote, isNoturno, temEscapeUrina, quantidadeDePacote,
                                    codigo_tipo_absorvente, codigo_suavidade, codigo_fluxo, codigo_tamanho) {
            const newProduct = await produtoDao.inserir(marca, nome, temAbas, quantidadeNoPacote, isNoturno, temEscapeUrina, quantidadeDePacote,
                                                        codigo_tipo_absorvente, codigo_suavidade, codigo_fluxo, codigo_tamanho)
            if (newProduct instanceof ProductModel) {
                return {status: 201, data: newProduct}
            }
            return {status: 500, data: "Desculpe, não foi possível realizar o cadastro do produto"}    
    },

    updateProduct: async function(codigo, marca, nome, temAbas, quantidadeNoPacote, isNoturno, temEscapeUrina, quantidadeDePacote,
                                codigo_tipo_absorvente, codigo_suavidade, codigo_fluxo, codigo_tamanho) {
                const [response] = await produtoDao.atualizar(codigo, marca, nome, temAbas, quantidadeNoPacote, isNoturno, temEscapeUrina, quantidadeDePacote, 
                                                            codigo_tipo_absorvente, codigo_suavidade, codigo_fluxo, codigo_tamanho)
                return {status: 200, data: response}

    },

    deleteProduct: async function(codigo) {

            if(await this.existsCode(codigo)) {
                const response = await produtoDao.excluir(codigo)
                return {status: 200, data: response}
            }
            return {status: 404, data: "Não existe um produto com esse código"}
    },

    incrementPackage: async function(codigo, quantidade) {
        const response = await produtoDao.entradaDePacote(codigo, quantidade)
        return {status: 200, data: response}
    },

    decrementPackage: async function(codigo, quantidade) {
        const product = await this.getProductByCode(codigo)

        if(product.quantidadeDePacote - quantidade < 0){
            return {status: 404, data: "Quantidade de pacotes não pode ser menor que zero"}
        }

        const response = await produtoDao.saidaDePacote(codigo, quantidade)
        return {status: 200, data: response}
    }
}