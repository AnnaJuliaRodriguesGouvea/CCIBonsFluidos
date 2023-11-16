import CampoTexto from "../CampoTexto";

const DadosPessoaJuridica = ({CNPJ, handleChangeCNPJ, razaoSocial, handleChangeRazaoSocial}) => {

    return (
        <>
            {/*FEITO - TODO - colocar mascara de cnpj - LUIS*/}
            <CampoTexto
                label="CNPJ"
                nome="CNPJ"
                valor={CNPJ}
                tipo="text"
                placeholder="Digite o CNPJ da empresa"
                aoAlterar={handleChangeCNPJ}
            />
            <CampoTexto
                label="Razão Social"
                nome="razaoSocial"
                valor={razaoSocial}
                tipo="text"
                placeholder="Digite a razão social da empresa"
                aoAlterar={handleChangeRazaoSocial}
            />
        </>
    )
}

export default DadosPessoaJuridica