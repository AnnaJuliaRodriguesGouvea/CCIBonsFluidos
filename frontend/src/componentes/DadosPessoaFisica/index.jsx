import CampoTexto from "../CampoTexto"

const DadosPessoaFisica = ({CPF, handleChangeCPF, NomePF, handleChangeNomePF, DataDeNascimento, handleChangeDataDeNascimento}) => {

    return (
        <>
            {/* FEITO - TODO - colocar mascara de cpf - LUIS*/}
            <CampoTexto
                label="CPF"
                nome="CPF"
                valor={CPF}
                tipo="text"
                placeholder="Digite o seu CPF"
                aoAlterar={handleChangeCPF}
            />
            <CampoTexto
                label="Nome"
                nome="nomePF"
                valor={NomePF}
                tipo="text"
                placeholder="Digite o seu nome"
                aoAlterar={handleChangeNomePF}
            />
            <CampoTexto
                label="Data de Nascimento"
                nome="dataDeNascimento"
                valor={DataDeNascimento}
                tipo="date"
                placeholder="Digite a sua data de nascimento"
                aoAlterar={handleChangeDataDeNascimento}
            />
        </>
    )
}

export default DadosPessoaFisica