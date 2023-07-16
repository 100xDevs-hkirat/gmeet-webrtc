import { Card } from "@mui/material"


export const CentralizedCard = ({children}) => {
    return <div style={{minHeight: "90vh", display: "flex", justifyContent: "center", flexDirection: "column-reverse"}}>
        <div style={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
            <Card style={{minWidth: 400, padding: 20}}>
                {children}
            </Card>
        </div>
        
    </div>
}